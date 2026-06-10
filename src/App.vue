<script setup>
import { computed, onMounted, ref, watch } from 'vue'

import { findSpotById, routes, spotTypes, spots } from './mock/travelData'

const activeView = ref('spots')
const keyword = ref('')
const activeType = ref('全部')
const selectedSpotId = ref(1)
const selectedRouteId = ref(1)
const favorites = ref([])
const detailTab = ref('overview')

const storageKey = 'codex-trip-favorites'

function loadFavorites() {
  try {
    const raw = localStorage.getItem(storageKey)
    favorites.value = raw ? JSON.parse(raw) : []
  } catch {
    favorites.value = []
  }
}

function saveFavorites() {
  localStorage.setItem(storageKey, JSON.stringify(favorites.value))
}

onMounted(() => {
  loadFavorites()
  if (!selectedSpot.value && filteredSpots.value.length) {
    selectedSpotId.value = filteredSpots.value[0].id
  }
})

watch(favorites, saveFavorites, { deep: true })

const selectedSpot = computed(() => findSpotById(selectedSpotId.value) ?? spots[0])

const selectedRoute = computed(
  () => routes.find((item) => item.id === Number(selectedRouteId.value)) ?? routes[0],
)

const filteredSpots = computed(() => {
  const query = keyword.value.trim().toLowerCase()

  return spots.filter((spot) => {
    const matchKeyword =
      !query ||
      spot.name.toLowerCase().includes(query) ||
      spot.location.toLowerCase().includes(query) ||
      spot.intro.toLowerCase().includes(query)
    const matchType = activeType.value === '全部' || spot.type === activeType.value

    return matchKeyword && matchType
  })
})

const hotSpots = computed(() => spots.filter((spot) => spot.isHot))
const favoriteSpots = computed(() => spots.filter((spot) => favorites.value.includes(spot.id)))

function openSpot(spot) {
  selectedSpotId.value = spot.id
  detailTab.value = 'overview'
  activeView.value = 'detail'
}

function toggleFavorite(spotId) {
  if (favorites.value.includes(spotId)) {
    favorites.value = favorites.value.filter((id) => id !== spotId)
    return
  }

  favorites.value = [...favorites.value, spotId]
}

function selectRoute(route) {
  selectedRouteId.value = route.id
  activeView.value = 'routes'
}

function goBackToList() {
  activeView.value = 'spots'
}

function goToView(view) {
  activeView.value = view
}
</script>

<template>
  <div class="shell">
    <header class="hero">
      <div class="hero__top">
        <div>
          <p class="eyebrow">北京旅行攻略</p>
          <h1>用一部手机，快速安排北京的第一站行程</h1>
        </div>
        <button class="ghost-btn" type="button" @click="goToView('favorites')">
          <span class="ghost-btn__icon">♥</span>
          收藏 {{ favorites.length }}
        </button>
      </div>
      <p class="hero__desc">
        这是一个移动端优先的北京旅行攻略站，聚合知名景点、经典路线和基础游玩提示，数据由
        Vue3 本地 mock 模拟。
      </p>

      <div class="stats">
        <article class="stat">
          <strong>{{ spots.length }}</strong>
          <span>精选景点</span>
        </article>
        <article class="stat">
          <strong>{{ routes.length }}</strong>
          <span>推荐路线</span>
        </article>
        <article class="stat">
          <strong>0</strong>
          <span>无需登录</span>
        </article>
      </div>
    </header>

    <main class="content">
      <section class="panel">
        <div class="tabs" role="tablist" aria-label="主导航">
          <button :class="['tab', { active: activeView === 'spots' }]" type="button" @click="goToView('spots')">
            景点
          </button>
          <button
            :class="['tab', { active: activeView === 'routes' }]"
            type="button"
            @click="goToView('routes')"
          >
            路线
          </button>
          <button
            :class="['tab', { active: activeView === 'favorites' }]"
            type="button"
            @click="goToView('favorites')"
          >
            收藏
          </button>
        </div>
      </section>

      <section v-if="activeView === 'spots'" class="panel panel--stack">
        <div class="searchbar">
          <label class="searchbox">
            <span class="searchbox__icon">⌕</span>
            <input v-model="keyword" type="text" placeholder="搜索景点、区域或关键词" />
          </label>
        </div>

        <div class="chips" aria-label="景点分类筛选">
          <button
            v-for="type in spotTypes"
            :key="type"
            :class="['chip', { active: activeType === type }]"
            type="button"
            @click="activeType = type"
          >
            {{ type }}
          </button>
        </div>

        <section class="mini-section">
          <div class="section-head">
            <h2>热门推荐</h2>
            <span>{{ hotSpots.length }} 个</span>
          </div>
          <div class="spot-row">
            <article v-for="spot in hotSpots" :key="spot.id" class="spot-card spot-card--horizontal">
              <img :src="spot.cover" :alt="spot.name" class="spot-card__cover" />
              <div class="spot-card__body">
                <div class="spot-card__meta">
                  <span class="tag">{{ spot.type }}</span>
                  <span class="tag tag--soft">{{ spot.location }}</span>
                </div>
                <h3>{{ spot.name }}</h3>
                <p>{{ spot.intro }}</p>
                <div class="spot-card__actions">
                  <button class="text-btn" type="button" @click="openSpot(spot)">查看详情</button>
                  <button class="icon-btn" type="button" @click="toggleFavorite(spot.id)">
                    {{ favorites.includes(spot.id) ? '★' : '☆' }}
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section class="mini-section">
          <div class="section-head">
            <h2>景点列表</h2>
            <span>共 {{ filteredSpots.length }} 条</span>
          </div>

          <div v-if="filteredSpots.length" class="grid">
            <article v-for="spot in filteredSpots" :key="spot.id" class="spot-card">
              <img :src="spot.cover" :alt="spot.name" class="spot-card__cover" />
              <div class="spot-card__body">
                <div class="spot-card__meta">
                  <span class="tag">{{ spot.type }}</span>
                  <span class="tag tag--soft">{{ spot.recommendLevel }}</span>
                </div>
                <h3>{{ spot.name }}</h3>
                <p>{{ spot.intro }}</p>
                <ul class="spot-card__info">
                  <li>{{ spot.location }}</li>
                  <li>{{ spot.visitDuration }}</li>
                </ul>
                <div class="spot-card__actions">
                  <button class="text-btn" type="button" @click="openSpot(spot)">详情</button>
                  <button class="text-btn text-btn--plain" type="button" @click="toggleFavorite(spot.id)">
                    {{ favorites.includes(spot.id) ? '取消收藏' : '收藏' }}
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="empty">
            <p>暂无相关景点，换个关键词试试。</p>
          </div>
        </section>
      </section>

      <section v-else-if="activeView === 'routes'" class="panel panel--stack">
        <div class="section-head">
          <h2>北京经典路线</h2>
          <span>{{ routes.length }} 条建议</span>
        </div>

        <div class="route-list">
          <article v-for="route in routes" :key="route.id" class="route-card" :class="{ active: selectedRoute.id === route.id }">
            <div class="route-card__head">
              <div>
                <p class="route-card__days">{{ route.days }} 天游玩</p>
                <h3>{{ route.title }}</h3>
              </div>
              <button class="icon-btn" type="button" @click="selectedRouteId = route.id">▸</button>
            </div>
            <p class="route-card__summary">{{ route.summary }}</p>
            <div class="route-card__spots">
              <span v-for="spot in route.spots" :key="spot" class="tag tag--soft">{{ spot }}</span>
            </div>
            <button class="text-btn" type="button" @click="selectRoute(route)">查看路线详情</button>
          </article>
        </div>

        <article class="detail-card">
          <div class="detail-card__head">
            <p class="eyebrow">路线详情</p>
            <h3>{{ selectedRoute.title }}</h3>
          </div>
          <dl class="detail-list">
            <div>
              <dt>适合人群</dt>
              <dd>{{ selectedRoute.suitableFor }}</dd>
            </div>
            <div>
              <dt>游玩节奏</dt>
              <dd>{{ selectedRoute.timePlan }}</dd>
            </div>
            <div>
              <dt>注意事项</dt>
              <dd>{{ selectedRoute.notes.join(' · ') }}</dd>
            </div>
          </dl>
        </article>
      </section>

      <section v-else-if="activeView === 'favorites'" class="panel panel--stack">
        <div class="section-head">
          <h2>我的收藏</h2>
          <span>{{ favoriteSpots.length }} 个已收藏景点</span>
        </div>

        <div v-if="favoriteSpots.length" class="grid">
          <article v-for="spot in favoriteSpots" :key="spot.id" class="spot-card">
            <img :src="spot.cover" :alt="spot.name" class="spot-card__cover" />
            <div class="spot-card__body">
              <div class="spot-card__meta">
                <span class="tag">{{ spot.type }}</span>
                <span class="tag tag--soft">{{ spot.location }}</span>
              </div>
              <h3>{{ spot.name }}</h3>
              <p>{{ spot.intro }}</p>
              <div class="spot-card__actions">
                <button class="text-btn" type="button" @click="openSpot(spot)">详情</button>
                <button class="text-btn text-btn--plain" type="button" @click="toggleFavorite(spot.id)">
                  取消收藏
                </button>
              </div>
            </div>
          </article>
        </div>

        <div v-else class="empty">
          <p>还没有收藏内容，先去景点页点一下收藏吧。</p>
        </div>
      </section>

      <section v-else class="panel panel--stack">
        <div class="detail-toolbar">
          <button class="back-btn" type="button" @click="goBackToList">← 返回</button>
          <button class="icon-btn" type="button" @click="toggleFavorite(selectedSpot.id)">
            {{ favorites.includes(selectedSpot.id) ? '★' : '☆' }}
          </button>
        </div>

        <article class="detail-hero">
          <img :src="selectedSpot.cover" :alt="selectedSpot.name" class="detail-hero__cover" />
          <div class="detail-hero__info">
            <div class="spot-card__meta">
              <span class="tag">{{ selectedSpot.type }}</span>
              <span class="tag tag--soft">{{ selectedSpot.location }}</span>
            </div>
            <h2>{{ selectedSpot.name }}</h2>
            <p>{{ selectedSpot.detail }}</p>
            <div class="detail-hero__facts">
              <span>{{ selectedSpot.openTime }}</span>
              <span>{{ selectedSpot.ticketInfo }}</span>
              <span>{{ selectedSpot.visitDuration }}</span>
            </div>
          </div>
        </article>

        <div class="detail-tabs">
          <button :class="['chip', { active: detailTab === 'overview' }]" type="button" @click="detailTab = 'overview'">
            游玩建议
          </button>
          <button :class="['chip', { active: detailTab === 'tips' }]" type="button" @click="detailTab = 'tips'">
            实用提示
          </button>
          <button :class="['chip', { active: detailTab === 'nearby' }]" type="button" @click="detailTab = 'nearby'">
            周边推荐
          </button>
        </div>

        <div v-if="detailTab === 'overview'" class="detail-section">
          <h3>亮点</h3>
          <div class="chips">
            <span v-for="item in selectedSpot.highlights" :key="item" class="chip chip--static">{{ item }}</span>
          </div>
        </div>

        <div v-else-if="detailTab === 'tips'" class="detail-section">
          <h3>游玩提示</h3>
          <ul class="bullet-list">
            <li v-for="tip in selectedSpot.tips" :key="tip">{{ tip }}</li>
          </ul>
        </div>

        <div v-else class="detail-section">
          <h3>周边推荐</h3>
          <ul class="bullet-list">
            <li v-for="item in selectedSpot.nearby" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.shell {
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 16px 14px 100px;
}

.hero {
  padding: 18px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(25, 63, 74, 0.94), rgba(31, 87, 92, 0.88)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
  color: #f4fbfb;
  box-shadow: 0 22px 46px rgba(22, 49, 57, 0.18);
}

.hero__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  letter-spacing: 0;
  text-transform: uppercase;
  color: rgba(233, 251, 248, 0.72);
}

.hero h1 {
  margin: 0;
  font-size: clamp(30px, 7vw, 44px);
  line-height: 1.08;
}

.hero__desc {
  margin: 14px 0 0;
  max-width: 54ch;
  color: rgba(234, 247, 245, 0.82);
}

.ghost-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.ghost-btn__icon {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.stat {
  padding: 14px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.12);
}

.stat strong,
.stat span {
  display: block;
}

.stat strong {
  font-size: 20px;
}

.stat span {
  margin-top: 4px;
  font-size: 12px;
  color: rgba(236, 248, 245, 0.72);
}

.content {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}

.panel {
  padding: 14px;
  border-radius: 22px;
  background: rgba(250, 253, 252, 0.78);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 36px rgba(22, 49, 57, 0.08);
}

.panel--stack {
  display: grid;
  gap: 14px;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.tab {
  padding: 12px 10px;
  border-radius: 16px;
  background: #e8f1ef;
  color: #45606a;
}

.tab.active {
  background: linear-gradient(135deg, #1f6670, #2d8a7b);
  color: #fff;
}

.searchbar {
  display: grid;
}

.searchbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: #f1f7f6;
  color: #6f878f;
}

.searchbox input {
  width: 100%;
  border: 0;
  background: transparent;
  outline: none;
  color: #17313b;
}

.searchbox__icon {
  font-size: 18px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  padding: 10px 14px;
  border-radius: 999px;
  background: #ebf3f1;
  color: #4b6770;
}

.chip.active {
  background: #183f48;
  color: #fff;
}

.chip--static {
  cursor: default;
}

.mini-section,
.detail-section {
  display: grid;
  gap: 12px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.section-head h2,
.detail-card__head h3,
.detail-hero__info h2,
.route-card h3,
.spot-card h3 {
  margin: 0;
}

.section-head span,
.route-card__days,
.route-card__summary,
.spot-card p,
.detail-card dd,
.detail-hero__info p {
  color: #5f7880;
}

.spot-row {
  display: grid;
  gap: 12px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.spot-card,
.route-card,
.detail-card {
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 12px 26px rgba(22, 49, 57, 0.08);
}

.spot-card--horizontal {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
}

.spot-card__cover,
.detail-hero__cover {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.spot-card__body {
  display: grid;
  gap: 10px;
  padding: 14px;
}

.spot-card__meta,
.spot-card__actions,
.route-card__head,
.detail-toolbar,
.detail-hero__facts {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.spot-card__info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  color: #587078;
  font-size: 13px;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: #deedea;
  color: #31555d;
  font-size: 12px;
}

.tag--soft {
  background: #f1f5f4;
}

.text-btn,
.icon-btn,
.back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 12px;
  border-radius: 12px;
  background: #e7f0ee;
  color: #21434d;
}

.text-btn--plain {
  background: transparent;
  padding-inline: 0;
}

.icon-btn {
  width: 38px;
  height: 38px;
  padding: 0;
  border-radius: 50%;
}

.empty {
  padding: 24px 16px;
  border-radius: 16px;
  background: #f3f7f6;
  text-align: center;
  color: #5f7880;
}

.route-list {
  display: grid;
  gap: 12px;
}

.route-card {
  padding: 14px;
}

.route-card.active {
  outline: 2px solid rgba(45, 138, 123, 0.22);
}

.route-card__summary {
  margin: 10px 0 12px;
}

.route-card__spots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.detail-card {
  padding: 14px;
}

.detail-list {
  display: grid;
  gap: 12px;
  margin: 0;
}

.detail-list dt {
  font-size: 12px;
  color: #7b949b;
}

.detail-list dd {
  margin: 4px 0 0;
}

.detail-toolbar {
  margin-bottom: 6px;
}

.back-btn {
  background: #edf4f2;
}

.detail-hero {
  display: grid;
  gap: 14px;
}

.detail-hero__cover {
  border-radius: 18px;
}

.detail-hero__info {
  display: grid;
  gap: 10px;
}

.detail-hero__facts {
  flex-wrap: wrap;
  color: #52717a;
  font-size: 13px;
}

.bullet-list {
  margin: 0;
  padding-left: 18px;
  color: #56707a;
}

.bullet-list li + li {
  margin-top: 8px;
}

@media (min-width: 700px) {
  .shell {
    padding: 22px 18px 120px;
  }

  .spot-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-hero {
    grid-template-columns: 1.1fr 1fr;
    align-items: stretch;
  }
}

@media (max-width: 420px) {
  .hero {
    padding: 16px;
  }

  .hero__top {
    flex-direction: column;
  }

  .stats {
    grid-template-columns: 1fr;
  }

  .spot-card--horizontal {
    grid-template-columns: 1fr;
  }
}
</style>
