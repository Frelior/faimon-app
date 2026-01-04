<script setup lang="ts">
import CharacterPageView from './CharacterPageView.vue'
import { supabase } from '@/lib/supabaseClient'

import { useCharactersStore } from '@/stores/characterStore'
import {
  getCharacterSkills,
  getSkillsByType,
  createNewSkill,
  sortSkillsByOrderIndex,
} from '@/services/skills'
import { generateImagePath, uploadImage, deleteImage, setPreview } from '@/services/images'
import { computed, reactive, ref, watch } from 'vue'
import type { Skill } from '@/interfaces/interfaces'
const store = useCharactersStore()
const skillsObject = reactive<{ [key: string]: { title: string; skills: Skill[] } }>({
  attack: { title: 'Базовая атака', skills: [] },
  technique: { title: 'Техника', skills: [] },
  ultimate: { title: 'Ульта', skills: [] },
  counter: { title: 'Контратака', skills: [] },
  dodge: { title: 'Уворот', skills: [] },
  passive: { title: 'Пассивки', skills: [] },
  constellation: { title: 'Консты', skills: [] },
  weapon: { title: 'Оружие', skills: [] },
  coreStamp: { title: 'Именной штамп', skills: [] },
  description: { title: 'Описание', skills: [] },
})
const skillsToUpload = computed(() => {
  return Object.values(skillsObject).flatMap((value) => value.skills)
})
const deletedIds = ref<number[]>([])
const oldImagePathes = ref<string[]>([])
const newImages = ref<
  {
    file: File
    path: string
  }[]
>([])
const isProcessing = ref(false)
const previewRenderKey = ref(0)
watch(
  () => store.currentCharacter,
  async () => {
    if (store.currentCharacter) {
      const data = await getCharacterSkills(store.currentCharacter.id)
      if (data) {
        for (const key in skillsObject) {
          skillsObject[key]!.skills = getSkillsByType(data, key)
        }
      }
    }
  },
  { immediate: true },
)
function deleteSkill(skill: Skill, array: Skill[]) {
  if (skill.id) {
    deletedIds.value.push(skill.id)
  }
  array.splice(array.indexOf(skill), 1)
  console.log(deletedIds.value)
}

function onImageChange(
  e: Event,
  skill: Skill,
  folder: 'characterFull' | 'characterIcons' | 'descriptionImages' | 'skillIcons',
) {
  if (!skill || !folder) return
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  const newImage = target.files[0]

  const path = generateImagePath(folder, newImage.name)
  console.log('new image path', path)

  newImages.value.push({ file: newImage, path })
  console.log(newImages.value)
  if (skill.image_path) {
    oldImagePathes.value.push(skill.image_path)
  }
  skill.image_path = path
  skill.preview_url = setPreview(newImage, skill?.preview_url)
}
async function saveChanges() {
  const confirm = window.confirm('Вы уверены, что хотите сохранить изменения скилов?')
  if (!confirm) return
  let errors = false
  isProcessing.value = true
  if (!skillsToUpload.value.length) {
    isProcessing.value = false
    alert('НЕТ СКИЛОВ')
    return
  }
  skillsToUpload.value.forEach((skill) => {
    if (Object.keys(skill).includes('preview_url')) {
      delete skill.preview_url
    }
    if (Object.keys(skill).includes('client_id')) {
      delete skill.client_id
    }
  })
  const skillsToUpdate = skillsToUpload.value.filter((skill) => skill.id)
  // const skillsToUpdate = skillsToUpdateRaw.map(removeClientId)
  // console.log(skillsToUpdate)

  const skillsToCreate = skillsToUpload.value.filter((skill) => !skill.id)
  // const skillsToCreate = skillsToCreateRaw.map(removeClientId)
  // console.log(skillsToCreate)

  for (const skill of skillsToUpdate) {
    const { id, ...rest } = skill
    const { error } = await supabase.from('skills').update(rest).eq('id', id)
    if (error) {
      isProcessing.value = false
      alert('Ошибка обновления скилов')
      errors = true
    }
  }
  for (const skill of skillsToCreate) {
    const { error } = await supabase.from('skills').insert(skill)
    if (error) {
      isProcessing.value = false
      alert('Ошибка добавления скилов')
      errors = true
    }
  }
  if (deletedIds.value.length) {
    await supabase
      .from('skills')
      .delete()
      .in('id', deletedIds.value)
      .then((res) => {
        console.log(res.data)

        if (res.error) {
          console.error(res.error)
          alert('Ошибка удаления скилов, но все остальные скилы обновлены')
          errors = true
        }
        deletedIds.value = []
      })
  }

  for (const path of oldImagePathes.value) {
    await deleteImage(path)
  }
  for (const record of newImages.value) {
    await uploadImage(record.path, record.file)
  }

  if (errors) {
    isProcessing.value = false
    alert('Сохранение прошло с ошибками')
  }
  alert('Информация персонажа обновлена, перезагрузите страницу')
  isProcessing.value = false
}
</script>

<template>
  <div class="edit-skills" v-if="store.currentCharacter?.id">
    <button @click="(console.log(skillsObject), console.log(skillsToUpload))">skills log</button>
    <button class="save-skills" @click="saveChanges">СОХРАНИТЬ СКИЛЛЫ</button>

    <div class="section" v-for="(value, key) in skillsObject" :key="key">
      <p class="title">{{ value.title }}</p>
      <div class="skills">
        <div class="skill" v-for="skill in value.skills" :key="skill.client_id">
          <p v-if="key !== 'description'" class="skill-title">
            Запись №{{ value.skills.indexOf(skill) + 1 }}
          </p>
          <p v-if="key !== 'description'" class="l-name">Название</p>
          <QuillEditor
            v-if="key !== 'description'"
            theme="snow"
            :content-type="'html'"
            :toolbar="[
              'bold',
              'italic',
              'underline',
              { header: 1 },
              { header: 2 },
              { color: [] },
              { background: [] },
            ]"
            v-model:content="skill.name"
          />
          <p class="l-name">Описание</p>
          <QuillEditor
            theme="snow"
            :content-type="'html'"
            :toolbar="'full'"
            v-model:content="skill.description"
          />
          <label
            >Картинка
            <span v-if="key === 'description'"
              >Баннер в начале страницы, в оригинале 1600х1016</span
            >
            <span v-else>соотношение 1:1, типа 80х80 или 128х128</span>
            <p>текущий путь: {{ skill.image_path }}</p>
            <input
              type="file"
              accept="image/png"
              @change="onImageChange($event, skill, 'skillIcons')"
              multiple="false"
            />
          </label>
          <button
            class="del-btn"
            @click="
              (deleteSkill(skill, value.skills),
              (value.skills = sortSkillsByOrderIndex(value.skills)))
            "
          >
            УДАЛИТЬ СКИЛЛ
          </button>
        </div>
        <button
          v-if="!(key === 'description' && value.skills.length >= 1)"
          class="add-btn"
          @click="
            (value.skills.push(
              createNewSkill(store.currentCharacter.id, key, value.skills.length + 1),
            ),
            (value.skills = sortSkillsByOrderIndex(value.skills)))
          "
        >
          ДОБАВИТЬ СКИЛЛ В СЕКЦИЮ
        </button>
      </div>
    </div>
  </div>
  <button class="save-skills" @click="saveChanges">СОХРАНИТЬ СКИЛЛЫ</button>
  <p class="preview-title">ПРЕВЬЮ</p>
  <button @click="previewRenderKey++">Обновить превью</button>
  <CharacterPageView
    :key="previewRenderKey"
    v-if="skillsToUpload.length && store.currentCharacter"
    :previewCharacter="store.currentCharacter"
    :previewSkills="skillsToUpload"
  />
</template>

<style scoped>
.save-skills {
  font-size: 2rem;
  margin-top: 2rem;
  padding: 0.5rem 2rem;
  width: fit-content;
  border-radius: 0.5rem;
}
.preview-title {
  text-align: center;
  font-size: 4rem;
  margin-top: 10rem;
}
:deep(.ql-container) {
  background-color: rgba(63, 63, 63, 0.815);
  border-radius: 15px;
  color: white;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
:deep(.ql-toolbar) {
  background-color: white;
  color: white;
  border-radius: 15px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.edit-skills {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5rem;
  border: 0.3rem solid var(--border-gray);

  button {
    padding: 0.5rem 2rem;
    width: fit-content;
    border-radius: 0.5rem;

    &.del-btn {
      background-color: red;
      align-self: flex-end;
    }
    &.add-btn {
      background-color: rgb(0, 173, 0);
    }
  }

  .section {
    border: 0.5rem solid var(--font-orange);
    .skills {
      /* background-color: white; */
      /* color: black; */
      display: flex;
      flex-direction: column;
      gap: 3rem;

      .skill {
        display: flex;
        flex-direction: column;
        border: 1rem solid gray;
        border: 0.5rem solid white;

        .skill-title {
          text-align: center;
          background-color: gray;
          font-size: 2rem;
        }
        .l-name {
          text-align: center;
          background-color: gray;
        }
      }
    }
    .title {
      font-size: 2rem;
      border: 0.3rem solid wheat;
      text-align: center;
      background-color: var(--font-orange-05);
    }
  }
}
</style>
