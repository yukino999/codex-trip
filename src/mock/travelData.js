function makeCover(title, accentA, accentB, subtitle) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accentA}" />
          <stop offset="100%" stop-color="${accentB}" />
        </linearGradient>
      </defs>
      <rect width="720" height="480" rx="36" fill="url(#bg)" />
      <circle cx="608" cy="96" r="70" fill="rgba(255,255,255,0.18)" />
      <circle cx="142" cy="92" r="32" fill="rgba(255,255,255,0.16)" />
      <path d="M0 350 C120 306 238 302 360 338 C474 370 596 372 720 330 L720 480 L0 480 Z" fill="rgba(17,33,40,0.10)" />
      <path d="M98 322 L140 270 L181 322 Z" fill="rgba(255,255,255,0.44)" />
      <rect x="192" y="248" width="48" height="110" rx="12" fill="rgba(255,255,255,0.34)" />
      <rect x="252" y="214" width="60" height="144" rx="14" fill="rgba(255,255,255,0.44)" />
      <rect x="328" y="278" width="70" height="80" rx="16" fill="rgba(255,255,255,0.30)" />
      <rect x="414" y="232" width="52" height="126" rx="12" fill="rgba(255,255,255,0.38)" />
      <rect x="480" y="196" width="70" height="162" rx="16" fill="rgba(255,255,255,0.42)" />
      <rect x="564" y="260" width="44" height="98" rx="12" fill="rgba(255,255,255,0.30)" />
      <text x="52" y="92" fill="#fff" font-size="28" font-family="Arial, sans-serif" opacity="0.9">${subtitle}</text>
      <text x="52" y="154" fill="#fff" font-size="48" font-weight="700" font-family="Arial, sans-serif">${title}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const spotTypes = ['全部', '古迹', '园林', '博物馆', '街区', '地标']

export const spots = [
  {
    id: 1,
    name: '故宫博物院',
    type: '古迹',
    location: '东城区',
    recommendLevel: '五星推荐',
    openTime: '08:30 - 17:00',
    ticketInfo: '旺季门票 60 元，建议提前预约',
    visitDuration: '半天到一天',
    intro: '北京最具代表性的皇家宫殿建筑群，适合首次到北京的游客。',
    detail:
      '故宫博物院是明清两代皇家宫殿，建筑体量宏大，轴线分明，适合结合中轴线一起游览。建议早点入园，优先参观三大殿、珍宝馆和钟表馆。',
    highlights: ['中轴线建筑群', '珍宝馆', '钟表馆', '午门与神武门视角'],
    tips: ['建议提前线上预约', '入园后注意步行距离较长', '午后游客较多，尽量早到'],
    nearby: ['景山公园', '天安门广场', '北海公园'],
    isHot: true,
    cover: makeCover('故宫博物院', '#f0b15b', '#9b4f2e', 'Forbidden City'),
  },
  {
    id: 2,
    name: '天安门广场',
    type: '地标',
    location: '东城区',
    recommendLevel: '必到打卡',
    openTime: '全天开放',
    ticketInfo: '免费开放，部分区域需预约',
    visitDuration: '1 到 2 小时',
    intro: '北京城市中轴线的核心区域，适合清晨与傍晚打卡。',
    detail:
      '天安门广场是北京最具辨识度的公共空间，适合与故宫、中山公园等一起规划游览。适合拍照、感受城市仪式感。',
    highlights: ['城市中轴线', '升旗观礼氛围', '经典打卡位'],
    tips: ['注意安检与证件要求', '清晨人流相对较少', '适合与周边景点串联'],
    nearby: ['故宫博物院', '国家博物馆', '前门大街'],
    isHot: true,
    cover: makeCover('天安门广场', '#f05c57', '#b53d2a', 'Tiananmen Square'),
  },
  {
    id: 3,
    name: '颐和园',
    type: '园林',
    location: '海淀区',
    recommendLevel: '经典必去',
    openTime: '06:30 - 18:00',
    ticketInfo: '门票 30 元，联票另计',
    visitDuration: '半天',
    intro: '皇家园林代表作，适合慢走、看湖景和感受园林层次。',
    detail:
      '颐和园以昆明湖与万寿山为核心，路线可围绕长廊、佛香阁、苏州街展开。适合喜欢慢节奏游览的用户。',
    highlights: ['长廊', '佛香阁', '昆明湖', '十七孔桥'],
    tips: ['建议穿舒适鞋子', '夏秋季湖景最佳', '可乘船减少步行压力'],
    nearby: ['圆明园遗址公园', '北京大学', '清华大学'],
    isHot: true,
    cover: makeCover('颐和园', '#6fbf9b', '#327a75', 'Summer Palace'),
  },
  {
    id: 4,
    name: '八达岭长城',
    type: '古迹',
    location: '延庆区',
    recommendLevel: '远郊首选',
    openTime: '07:30 - 18:00',
    ticketInfo: '门票 40 元，缆车另计',
    visitDuration: '半天到一天',
    intro: '北京最热门的长城段之一，适合安排一日游。',
    detail:
      '八达岭长城设施相对成熟，交通方便，适合第一次体验长城的游客。建议提前规划往返交通，合理安排体力。',
    highlights: ['长城城墙视野', '北四楼段位', '缆车观景'],
    tips: ['周末游客较多', '注意天气和保暖', '可和居庸关一并规划'],
    nearby: ['居庸关长城', '野生动物园', '延庆城区'],
    isHot: true,
    cover: makeCover('八达岭长城', '#8d9e5f', '#4f6b3e', 'Great Wall'),
  },
  {
    id: 5,
    name: '天坛公园',
    type: '古迹',
    location: '东城区',
    recommendLevel: '晨游推荐',
    openTime: '06:00 - 22:00',
    ticketInfo: '联票约 34 元，公园票更低',
    visitDuration: '2 到 3 小时',
    intro: '经典古代祭天建筑群，适合早晨轻松游览。',
    detail:
      '天坛布局规整，适合拍建筑线条和感受古代礼制空间。清晨还能看到周边居民锻炼，体验更生活化的北京。',
    highlights: ['祈年殿', '回音壁', '圜丘坛'],
    tips: ['早上光线更适合拍照', '适合搭配前门区域', '注意园区面积较大'],
    nearby: ['前门大街', '北京坊', '先农坛'],
    isHot: false,
    cover: makeCover('天坛公园', '#3ca1c8', '#1d5470', 'Temple of Heaven'),
  },
  {
    id: 6,
    name: '圆明园遗址公园',
    type: '园林',
    location: '海淀区',
    recommendLevel: '历史感强',
    openTime: '07:00 - 19:00',
    ticketInfo: '门票 10 元，景区面积较大',
    visitDuration: '半天',
    intro: '适合喜欢历史与遗址氛围的游客，空间开阔。',
    detail:
      '圆明园更适合边走边看，核心在于遗址与水系空间。可将其与颐和园放在同一天，但建议不要安排过满。',
    highlights: ['遗址景观', '湖面空间', '历史叙事'],
    tips: ['适合阴天和早晨', '园区较大建议留足时间', '注意补水'],
    nearby: ['颐和园', '北京大学', '中国农业大学'],
    isHot: false,
    cover: makeCover('圆明园', '#5f8fd8', '#32547b', 'Old Summer Palace'),
  },
  {
    id: 7,
    name: '北海公园',
    type: '园林',
    location: '西城区',
    recommendLevel: '轻松漫游',
    openTime: '06:00 - 21:00',
    ticketInfo: '门票 10 元起',
    visitDuration: '2 小时左右',
    intro: '市中心经典公园，适合安排轻松散步和拍照。',
    detail:
      '北海公园在城市核心区，游览压力较低，适合与景山、什刹海一起串成一条悠闲线路。',
    highlights: ['白塔', '湖景', '皇家园林氛围'],
    tips: ['傍晚景色更柔和', '可和什刹海串联', '适合老人和亲子游客'],
    nearby: ['景山公园', '什刹海', '南锣鼓巷'],
    isHot: false,
    cover: makeCover('北海公园', '#67a3cc', '#3a6e99', 'Beihai Park'),
  },
  {
    id: 8,
    name: '798艺术区',
    type: '街区',
    location: '朝阳区',
    recommendLevel: '年轻人推荐',
    openTime: '全天开放',
    ticketInfo: '大部分区域免费，展览另计',
    visitDuration: '2 到 4 小时',
    intro: '工业风与艺术展结合，适合拍照、逛展和咖啡休息。',
    detail:
      '798艺术区更偏生活方式与艺术体验，适合周末轻松安排行程。可以拍照、看展、吃饭，节奏比较自由。',
    highlights: ['工业建筑', '艺术展览', '咖啡和餐饮'],
    tips: ['周末很适合逛街', '注意不同展馆开放时间', '穿搭拍照效果更好'],
    nearby: ['酒仙桥', '大望路商圈', '蓝色港湾'],
    isHot: false,
    cover: makeCover('798艺术区', '#d59a58', '#9d5d42', 'Art District'),
  },
  {
    id: 9,
    name: '雍和宫',
    type: '古迹',
    location: '东城区',
    recommendLevel: '文化体验',
    openTime: '09:00 - 16:30',
    ticketInfo: '门票约 25 元',
    visitDuration: '1 到 2 小时',
    intro: '北京非常有代表性的宗教建筑，适合拍建筑与感受文化氛围。',
    detail:
      '雍和宫建筑细节丰富，红墙与金顶具有很强的视觉识别度。适合安排在清晨或上午短时参观。',
    highlights: ['红墙金顶', '宗教建筑细节', '文化氛围'],
    tips: ['注意着装与参观礼仪', '适合与孔庙国子监串联', '周边交通方便'],
    nearby: ['国子监', '孔庙', '五道营胡同'],
    isHot: false,
    cover: makeCover('雍和宫', '#c26d64', '#7d3840', 'Lama Temple'),
  },
  {
    id: 10,
    name: '景山公园',
    type: '地标',
    location: '西城区',
    recommendLevel: '观景首选',
    openTime: '06:00 - 21:00',
    ticketInfo: '门票约 2 元，性价比高',
    visitDuration: '1 到 2 小时',
    intro: '适合登高俯瞰故宫和北京中轴线的观景点。',
    detail:
      '景山公园不大，但视野很好，是故宫游览后非常适合顺路安排的地方。登顶后能看到中轴线和周边城市景观。',
    highlights: ['俯瞰故宫', '中轴线视角', '轻松登高'],
    tips: ['适合与故宫联游', '黄昏时段视野更好', '公园坡度不大'],
    nearby: ['故宫博物院', '北海公园', '什刹海'],
    isHot: false,
    cover: makeCover('景山公园', '#84b36d', '#4f7840', 'Jingshan Park'),
  },
]

export const routes = [
  {
    id: 1,
    title: '北京经典一日游',
    days: 1,
    suitableFor: '第一次来北京的游客',
    summary: '以故宫、天安门、景山为主，覆盖最核心的城市中轴线体验。',
    spots: ['天安门广场', '故宫博物院', '景山公园'],
    timePlan: '上午天安门与故宫，中午简餐，下午景山俯瞰中轴线，晚间前门或王府井自由活动。',
    notes: ['需要提前预约故宫', '注意步行量较大', '建议穿舒适鞋子'],
  },
  {
    id: 2,
    title: '北京皇家园林两日游',
    days: 2,
    suitableFor: '喜欢慢节奏和园林风景的游客',
    summary: '把颐和园、圆明园、北海公园串联起来，节奏更轻松。',
    spots: ['颐和园', '圆明园遗址公园', '北海公园'],
    timePlan: '第一天游颐和园，第二天上午圆明园、下午北海公园和什刹海周边。',
    notes: ['适合家庭出行', '注意不同景区开放时间', '可根据体力调整顺序'],
  },
  {
    id: 3,
    title: '北京文化与街区慢游',
    days: 1,
    suitableFor: '喜欢拍照、展览和城市漫步的人群',
    summary: '将雍和宫、798艺术区与胡同周边组合，覆盖传统与现代两种体验。',
    spots: ['雍和宫', '798艺术区', '南锣鼓巷'],
    timePlan: '上午看古建，下午逛艺术区，傍晚到胡同和咖啡店放松。',
    notes: ['适合周末短途', '拍照点较多', '行程可按兴趣灵活调整'],
  },
]

export function findSpotById(id) {
  return spots.find((item) => item.id === Number(id))
}
