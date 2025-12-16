<script setup lang="ts"></script>

<template>
  <div class="info-view view-container">
    <h1>FAIMON BLEACH SOUL RESONANCE</h1>
    <div class="description">
      <p>
        Bleach: Soul Resonance — это экшен-игра по мотивам культового аниме и манги Bleach, в
        которой игроки погружаются в мир синигами, пустых и духовных битв. Игра сочетает динамичную
        боевую систему, зрелищные способности персонажей и узнаваемую атмосферу оригинального
        произведения.
      </p>
      <p>
        Игрокам доступны культовые персонажи вселенной Bleach, каждый из которых обладает уникальным
        стилем боя, наборами умений и формами усиления. В сражениях важны тайминги, комбинации атак
        и грамотное использование способностей, что делает бои быстрыми и тактически насыщенными.
      </p>
      <p>
        Проект ориентирован как на одиночное прохождение, так и на соревновательные режимы, позволяя
        раскрывать персонажей, улучшать их характеристики и собирать оптимальные билды.
      </p>
      <p>
        Этот сайт создан как информационная база по Bleach: Soul Resonance — здесь вы найдёте
        описания персонажей, их навыки, характеристики, механики игры и полезные гайды.
      </p>
    </div>

    <div class="news">
      <h2>Последние новости</h2>
      <ul>
        <li>БЛИЧ КРУТО</li>
        <li>НАРУТА АТСТОЙ</li>
        <li>ИЧИГО ВЫШЕЛ ПИРСАНАЖ ПАИГРАТЬ ООНЛОАЙН БЕЗ СМС</li>
      </ul>
    </div>

    <img class="bg-image-character" src="/src/media/images/ichigo-bankai-full.png" />
  </div>
</template>

<style scoped>
.info-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;

  h1 {
    font-size: 4rem;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
