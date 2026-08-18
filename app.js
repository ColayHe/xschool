const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const state = {
  system: "overview",
  theme: localStorage.getItem("x-theme") || "light",
  appTab: "heritage",
  messageFilter: "all",
  activeChat: null,
  sentMessages: {},
  homeTab: "tree",
  parentHasCollegeEntitlement: true,
  inCollege: false,
  parentPage: "home",
  child: "张小满",
  selectedCourse: "desert",
  sessionDemo: null,
  reservationStatus: "待参营确认",
  preAssessmentComplete: false,
  growthSessionIndex: 2,
  opsPage: "orderRouting",
  scrmPage: "products",
  scrmOrderTab: "contract",
  scrmContractTab: "basic",
  scrmOrderPackage: "自然探索成长课包",
  scrmOrderChildren: ["东北雄鹰户外体验营", "沙漠星空探索营"],
  campPage: "workbench",
  childPage: "home",
  childLoggedIn: false,
  childLoginStage: "main",
  childTaskDone: new Set(["装备检查"]),
  childAssessmentDone: false,
  childMessageFilter: "all",
  childConversation: null,
  childAccountEnabled: false,
  campMode: "college",
  campMessageFilter: "all",
  campTaskFilter: "today",
  pendingCheckinName: null,
  approvalFilters: { keyword:"", type:"全部类型", course:"全部课程" },
  qualificationFilters: { keyword:"", status:"全部状态", package:"全部课包", balance:"全部次数" },
  qualificationDetailTab: "overview",
  selectedQualifications: new Set(),
  childUserFilters: { keyword:"", relation:"全部关系状态", qualification:"全部资格状态", journey:"全部参与状态" },
  childDirectoryView: "child",
  selectedChildUserId: "STU-240381",
  childUserDetailTab: "overview",
  sessionFilters: { keyword:"", status:"全部状态" },
  reservationFilters: { keyword:"", course:"全部课程", session:"全部营期", status:"全部状态", material:"全部资料", entitlement:"全部权益" },
  reservationView: "all",
  selectedReservations: new Set(),
  xOrderFilters: { keyword:"", package:"全部课包", validation:"全部校验", sync:"全部同步" },
  xOrderView: "all",
  selectedXOrders: new Set(),
  selectedSession: 0,
  sessionConfigTab: "basic",
  editingCourseIndex: null,
  rosterFilters: { keyword:"", status:"全部状态", group:"全部班级", material:"全部资料状态" },
  courses: [
    { id:"CRS-001", name:"沙漠星空探索营", type:"户外成长", age:"10–15岁", package:"自然探索成长课包", sessions:3, status:"已发布", detailStatus:"已配置", theme:"沙漠星空", tagline:"在真实荒野中，建立勇气、协作与自我管理", hero:"assets/desert-starry-hero.png" },
    { id:"CRS-002", name:"东北雪境探索营", type:"户外成长", age:"9–15岁", package:"自然探索成长课包", sessions:2, status:"已发布", detailStatus:"已配置", theme:"冰雪韧性", tagline:"在冰雪世界里发现坚持的力量", hero:"assets/northeast-snow-hero.png" },
    { id:"CRS-003", name:"海洋领导力营", type:"领导力", age:"10–16岁", package:"领导力成长课包", sessions:3, status:"已发布", detailStatus:"已配置", theme:"向海而行", tagline:"学会带领，也学会跟随", hero:"assets/ocean-leadership-hero.png" },
    { id:"CRS-004", name:"云南雨林共生营", type:"生态探索", age:"9–14岁", package:"暂不关联课包", sessions:2, status:"已发布", detailStatus:"已配置", theme:"雨林共生", tagline:"在万物相连的雨林里学习观察与敬畏", hero:"assets/rainforest-exploration-hero.png" },
    { id:"CRS-005", name:"敦煌人文行走营", type:"人文探索", age:"10–16岁", package:"暂不关联课包", sessions:2, status:"已发布", detailStatus:"已配置", theme:"丝路行走", tagline:"沿着文明的线索，建立更辽阔的世界观", hero:"assets/dunhuang-humanities-hero.png" },
  ],
  checkedIn: new Set(["周可乐", "陈星野"]),
  approvals: [
    { id: "AP-240813-04", type: "取消申请", name: "赵一诺", detail: "名单已锁定 · 疾病证明已上传", risk: "权益恢复 1 次", icon: "×" },
    { id: "AP-240813-03", type: "改期申请", name: "林知夏", detail: "新疆营 → 东北营 · 目标营位 3", risk: "需重新参营确认", icon: "⇄" },
    { id: "AP-240813-02", type: "更换营员", name: "陈以安 → 陈以禾", detail: "资格通过 · 健康资料待补充", risk: "原历史不迁移", icon: "人" },
    { id: "AP-240813-01", type: "合同异常", name: "王予安", detail: "合同已终止 · 预约已确认", risk: "需人工判定", icon: "!" },
  ],
};

const qualificationRows = [
  { id:"XQ-202608-0284", parent:"林女士", phone:"138****3821", order:"D260817-00231", package:"自然探索成长课包", courses:"东北雪境、沙漠星空", children:"张小满、张小安", used:0, frozen:0, total:5, expiry:"2027-08-16", status:"有效" },
  { id:"XQ-202608-0279", parent:"赵女士", phone:"139****0911", order:"D260812-00188", package:"自然探索成长课包", courses:"云南雨林、沙漠星空", children:"赵一诺", used:1, frozen:1, total:5, expiry:"2027-08-11", status:"有效" },
  { id:"XQ-202608-0268", parent:"周先生", phone:"136****1028", order:"D260809-00152", package:"领导力成长课包", courses:"海洋领导力", children:"周可乐", used:2, frozen:0, total:3, expiry:"2027-08-08", status:"有效" },
  { id:"XQ-202608-0251", parent:"陈女士", phone:"137****6620", order:"D260801-00096", package:"自然探索成长课包", courses:"东北雪境、敦煌人文", children:"陈星野", used:5, frozen:0, total:5, expiry:"2027-07-31", status:"已用完" },
  { id:"XQ-202607-0219", parent:"王先生", phone:"135****4417", order:"D260722-00671", package:"领导力成长课包", courses:"海洋领导力", children:"王予安", used:1, frozen:0, total:3, expiry:"2026-09-18", status:"即将到期" },
  { id:"XQ-202606-0187", parent:"刘女士", phone:"133****2096", order:"D260618-00432", package:"自然探索成长课包", courses:"云南雨林", children:"刘知夏", used:1, frozen:0, total:2, expiry:"2026-07-20", status:"已失效" },
];

const childUserRows = [
  {studentId:"STU-240381",name:"张小满",gender:"女",age:12,birthday:"2014-03-18",identity:"已实名",relation:"关系完整",qualification:"有效",journey:"待出发",current:"沙漠星空探索营 · 国庆营",completed:3,growth:"六维档案 3期",updated:"08-17 16:20",guardians:[{name:"林女士",relation:"母亲",phone:"138****3821",role:"主账号",qualification:"自然探索成长课包 · 有效"},{name:"张先生",relation:"父亲",phone:"137****1906",role:"共同监护人",qualification:"无独立资格"}]},
  {studentId:"STU-240396",name:"张小安",gender:"男",age:9,birthday:"2017-06-02",identity:"已实名",relation:"关系完整",qualification:"有效",journey:"未预约",current:"暂无进行中营期",completed:0,growth:"待建立",updated:"08-17 15:42",guardians:[{name:"林女士",relation:"母亲",phone:"138****3821",role:"主账号",qualification:"自然探索成长课包 · 有效"},{name:"张先生",relation:"父亲",phone:"137****1906",role:"共同监护人",qualification:"无独立资格"}]},
  {studentId:"STU-239817",name:"赵一诺",gender:"女",age:12,birthday:"2014-01-09",identity:"已实名",relation:"关系完整",qualification:"有效",journey:"变更处理中",current:"沙漠星空探索营 · 取消申请中",completed:1,growth:"六维档案 1期",updated:"08-17 14:08",guardians:[{name:"赵女士",relation:"母亲",phone:"139****0911",role:"主账号",qualification:"自然探索成长课包 · 有效"},{name:"赵先生",relation:"父亲",phone:"136****7255",role:"共同监护人",qualification:"无独立资格"}]},
  {studentId:"STU-238622",name:"周可乐",gender:"男",age:11,birthday:"2015-04-26",identity:"已实名",relation:"仅一个监护人",qualification:"有效",journey:"已结营",current:"海洋领导力营 · 已完成",completed:2,growth:"六维档案 2期",updated:"08-17 13:42",guardians:[{name:"周先生",relation:"父亲",phone:"136****1028",role:"主账号",qualification:"领导力成长课包 · 有效"}]},
  {studentId:"STU-237904",name:"陈星野",gender:"男",age:14,birthday:"2012-11-12",identity:"已实名",relation:"关系完整",qualification:"已用完",journey:"已结营",current:"暂无进行中营期",completed:4,growth:"六维档案 4期",updated:"08-17 11:26",guardians:[{name:"陈女士",relation:"母亲",phone:"137****6620",role:"主账号",qualification:"自然探索成长课包 · 已用完"},{name:"陈先生",relation:"父亲",phone:"135****2109",role:"共同监护人",qualification:"无独立资格"}]},
  {studentId:"STU-PENDING-18",name:"刘知夏",gender:"女",age:10,birthday:"2016-08-21",identity:"待确认",relation:"关系待确认",qualification:"已失效",journey:"未预约",current:"暂无进行中营期",completed:1,growth:"六维档案 1期",updated:"08-17 09:36",guardians:[{name:"刘女士",relation:"母亲（待核验）",phone:"133****2096",role:"待确认账号",qualification:"自然探索成长课包 · 已失效"}]}
];

const campSessions = [
  { id:"CP-202610-003", course:"沙漠星空探索营", name:"国庆营 · 第03期", dates:"2026.10.01–10.07", city:"腾格里", status:"报名中", leader:"李航", teachers:"陈毅北、周岚、王森", assistants:"苏宁、赵可", capacity:30, confirmed:21, pageStatus:"2/4 已发布" },
  { id:"CP-202701-008", course:"东北雪境探索营", name:"寒假营 · 第08期", dates:"2027.01.24–01.30", city:"长白山", status:"待发布", leader:"周岚", teachers:"陈毅北、何川", assistants:"待添加", capacity:24, confirmed:0, pageStatus:"待配置" },
  { id:"CP-202607-005", course:"海洋领导力营", name:"暑期营 · 第05期", dates:"2026.07.12–07.17", city:"海南", status:"已结束", leader:"王森", teachers:"林悦、苏宁", assistants:"赵可、吴桐", capacity:30, confirmed:29, pageStatus:"4/4 已发布" },
  { id:"CP-202608-002", course:"云南雨林共生营", name:"暑期营 · 第02期", dates:"2026.08.18–08.23", city:"西双版纳", status:"名单锁定", leader:"何川", teachers:"周岚、林悦", assistants:"吴桐", capacity:25, confirmed:25, pageStatus:"3/4 已发布" },
];

const sessionRosterRows = [
  { name:"张小满", age:12, guardian:"林女士", phone:"138****3821", status:"已确认参营", material:"已完成", transport:"高铁 · 凭证已传", qualification:"有效 · 冻结1次", group:"向日葵1班", mentor:"陈毅北", risk:"无" },
  { name:"周可乐", age:11, guardian:"周先生", phone:"136****1028", status:"已确认参营", material:"已完成", transport:"飞机 · 凭证已传", qualification:"有效 · 冻结1次", group:"向日葵1班", mentor:"陈毅北", risk:"坚果过敏" },
  { name:"陈星野", age:14, guardian:"陈女士", phone:"137****6620", status:"已确认参营", material:"待补健康资料", transport:"统一交通", qualification:"有效 · 冻结1次", group:"向日葵2班", mentor:"周岚", risk:"随身用药" },
  { name:"林知夏", age:10, guardian:"林先生", phone:"139****0911", status:"待参营确认", material:"待补交通凭证", transport:"高铁 · 待凭证", qualification:"有效 · 冻结1次", group:"待分组", mentor:"—", risk:"无" },
  { name:"王予安", age:13, guardian:"王先生", phone:"135****4417", status:"已确认参营", material:"已完成", transport:"自驾", qualification:"有效 · 冻结1次", group:"向日葵2班", mentor:"周岚", risk:"无" },
  { name:"赵一诺", age:12, guardian:"赵女士", phone:"139****3088", status:"取消申请中", material:"已完成", transport:"飞机 · 凭证已传", qualification:"冻结待审批", group:"向日葵3班", mentor:"王森", risk:"疾病证明" },
  { name:"陈以禾", age:11, guardian:"陈先生", phone:"133****7219", status:"已确认参营", material:"已完成", transport:"统一交通", qualification:"有效 · 冻结1次", group:"向日葵3班", mentor:"王森", risk:"与陈以安同行" },
  { name:"刘知远", age:15, guardian:"刘女士", phone:"158****1022", status:"候补中", material:"未开始", transport:"未填写", qualification:"有效 · 未冻结", group:"候补不分组", mentor:"—", risk:"无" },
];

document.documentElement.dataset.theme = state.theme;

function switchSystem(system) {
  state.system = system;
  $$(".system-tab").forEach((el) => el.classList.toggle("is-active", el.dataset.system === system));
  $$(".system-view").forEach((el) => el.classList.toggle("is-active", el.dataset.view === system));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(title, message = "状态已更新并记录操作留痕") {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i>✓</i><span><b>${title}</b><small>${message}</small></span>`;
  $("#toastStack").append(toast);
  setTimeout(() => toast.remove(), 3600);
}

function openModal(html) {
  $("#modalContent").innerHTML = html;
  $("#modalBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
  setTimeout(() => $(".modal button, .modal input, .modal select")?.focus(), 30);
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
  document.body.style.overflow = "";
}

function openDrawer(html) {
  const drawer = $("#drawerContent");
  const premiumOpsPages=["xorders","entitlements","courses","dashboard","postCamp","reservations","approvals"];
  drawer.classList.toggle("ops-premium-drawer",state.system==="ops"&&premiumOpsPages.includes(state.opsPage));
  drawer.dataset.opsPage=state.system==="ops"?state.opsPage:"";
  drawer.innerHTML = html;
  drawer.scrollTop = 0;
  $("#drawerBackdrop").hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  $("#drawerBackdrop").hidden = true;
  $("#drawerContent").classList.remove("scrm-wide-drawer","session-config-drawer","ops-premium-drawer");
  $("#drawerContent").dataset.opsPage="";
  document.body.style.overflow = "";
}

function collegeHeader(title, subtitle) {
  return `<header class="xcollege-header"><div class="xcollege-header__bar"><button class="xcollege-back" data-action="close-college" aria-label="返回兴智首页">‹</button><b>X学院</b><button class="xcollege-more" aria-label="更多">•••</button></div><div class="xcollege-child"><div><span>当前营员</span><button data-action="switch-child">${state.child}⌄</button></div><span class="xcollege-avatar">${state.child.slice(-1)}</span></div><h2>${title}</h2><p>${subtitle}</p><nav class="xcollege-tabs"><button data-parent-page="home">首页</button><button data-parent-page="courses">课程</button><button data-parent-page="reservations">预约</button><button data-parent-page="growth">成长</button></nav></header>`;
}

function collegeCompactHeader(title, subtitle) {
  return `<header class="college-compact-header"><div class="college-compact-bar"><button data-action="close-college" aria-label="返回兴智首页">‹</button><b>X学院</b><button aria-label="更多">•••</button></div><div class="college-compact-title"><span><h2>${title}</h2><p>${subtitle}</p></span><button data-action="switch-child"><i>${state.child.slice(-1)}</i><span>${state.child}</span><em>⌄</em></button></div><nav class="college-compact-tabs"><button data-parent-page="home">首页</button><button data-parent-page="courses">课程</button><button data-parent-page="reservations">预约</button><button data-parent-page="growth">成长</button></nav></header>`;
}

const parentAnnotations = {
  app: ["家庭成长树", "保持现有 App 首页内容不变；家庭成长树与 X学院通过首页双 Tab 切换。"],
  collegeHome: ["父母账号服务资格门槛", "是否进入X学院取决于父母账号是否拥有有效服务资格；合同孩子仅作为预约、参营和成长记录的候选服务对象。"],
  home: ["X学院业务首页", "进入模块后仍处于“传承”主 Tab，通过模块内导航承接权益、课程、预约与成长。"],
  courses: ["完整课程目录", "权益决定能否直接预约，不限制课程内容浏览；权益外课程进入详情后由指导师承接咨询。"],
  courseDetail: ["课程详情与我的本期", "每门课程都有独立介绍页；参营确认、补料、改期、取消和成长报告均在该课程的具体营期内完成。"],
  reservations: ["跨课程预约聚合", "这里只汇总家庭账号下所有课程的待办与状态；点击后回到对应课程详情中的“我的本期”处理。"],
  growth: ["长期成长档案", "跨营期证据永久归属原 student_id；更换参营营员时不迁移、不覆盖。"],
};

function renderHeritageHome() {
  const treeContent = `<section class="xz-service-card"><div class="xz-feature-grid"><button><i class="service-icon pink">▣</i><span>精品案例会</span></button><button><i class="service-icon purple">●</i><span>冥想</span></button><button><i class="service-icon blue">◆</i><span>精品课程</span></button><button><i class="service-icon orange">▤</i><span>兴智资讯</span></button></div><div class="xz-mini-grid"><button><i>♥</i><span>幸福专区</span></button><button><i>✦</i><span>疗愈专区</span></button><button><i>•••</i><span>个案咨询</span></button><button><i>✎</i><span>工作坊报名</span></button></div><div class="xz-pager"><i></i><i></i></div></section>
    <section class="xz-live-card"><div class="xz-card-title"><h3>直播</h3><span><button>↻ 刷新</button><button>◉ 回放</button></span></div><div class="xz-empty-live"><i>▶</i><p>暂无直播，敬请期待</p></div></section>
    <section class="xz-task-card"><div class="xz-task-head"><span><small>结营</small><b>明心营 · 学习任务</b></span><i>兴智小调查 ›</i></div>${["《10分钟复盘：让学到的方法不闲置》","《新时代家庭规矩与传承》","《家庭能量场的营造》"].map((name,index)=>`<button><span>${name}</span><em>${index===0?'已完成':'未完成'}</em></button>`).join('')}</section>`;
  return `<div class="xz-app-home"><main class="xz-home-body xz-home-body--top-tabs">
    <nav class="home-segmented-tabs" aria-label="首页内容切换"><button class="${state.homeTab==='tree'?'is-active':''}" data-home-tab="tree">家庭成长树</button><button class="${state.homeTab==='college'?'is-active':''}" data-home-tab="college">X学院</button></nav>
    ${state.homeTab === 'tree' ? treeContent : renderCollegeHomeTab()}
  </main></div>`;
}

function renderCollegeHomeTab() {
  if (!state.parentHasCollegeEntitlement) return `<div class="college-tab-view college-discovery"><section class="college-intro-hero college-intro-hero--visual"><div class="college-intro-copy"><span class="college-brand-mark">X</span><small>X学院 · 真实情境成长课程</small><h2>把世界变成<br>孩子的成长课堂</h2><p>从雨林、雪境到丝路与海洋，在专业守护下经历真实任务，让勇气、协作与判断真正发生。</p><div class="college-intro-actions"><button data-action="open-course-catalog">探索全部课程 <i>›</i></button><button class="ghost" data-action="college-consult">联系指导师</button></div></div><div class="college-intro-mosaic" aria-label="精选课程预览"><span class="rainforest"></span><span class="dunhuang"></span><span class="snow"></span></div><div class="college-intro-stats"><span><b>5+</b><small>精选课程</small></span><span><b>1:5</b><small>师生配比</small></span><span><b>全程</b><small>成长记录</small></span></div></section><section class="college-discovery-head"><div><small>本季精选</small><h3>先看课程，再决定是否加入</h3></div><button data-action="open-course-catalog">查看全部</button></section><div class="college-preview-rail"><button data-action="open-course-detail" data-course-key="rainforest"><span class="rainforest"><em>生态探索</em></span><b>云南雨林共生营</b><small>走进雨林，理解生命之间的连接</small></button><button data-action="open-course-detail" data-course-key="dunhuang"><span class="dunhuang"><em>人文探索</em></span><b>敦煌人文行走营</b><small>沿丝路线索，建立辽阔世界观</small></button></div><section class="college-value-card college-value-card--refined"><div class="college-value-title"><span class="eyebrow">X学院的不同</span><b>不是游学打卡，而是可沉淀的成长经历</b></div><div><i>01</i><p><b>真实情境任务</b><small>在观察、选择与协作中主动学习</small></p></div><div><i>02</i><p><b>专业团队守护</b><small>清晰师生比、医疗保障与应急机制</small></p></div><div><i>03</i><p><b>长期成长档案</b><small>每段经历持续沉淀，连接家庭实践</small></p></div></section><section class="college-consult-banner"><span><small>还不确定哪门课适合孩子？</small><b>指导师会结合年龄与成长目标提供建议</b></span><button data-action="college-consult">去咨询</button></section></div>`;
  return `<div class="college-tab-view college-member-home"><section class="member-benefit-hero"><div class="member-hero-top"><span><small>自然探索成长课包</small><b>家庭权益已开通</b></span><em>有效期至 2027.08.12</em></div><h2>这个夏天，<br>去更大的世界里成长</h2><div class="member-child-row"><span class="member-child-avatar">${state.child.slice(-1)}</span><span><small>当前服务对象</small><b>${state.child}</b></span><button data-action="switch-child">切换孩子</button></div><div class="member-benefit-stats"><span><b>3</b><small>剩余次数</small></span><span><b>2</b><small>已参与课程</small></span><span><b>1</b><small>待完成事项</small></span></div></section><nav class="member-quick-links"><button data-parent-page="courses"><i>⌁</i><span><b>探索课程</b><small>权益内与更多精选</small></span></button><button data-parent-page="reservations"><i>▣</i><span><b>我的预约</b><small>确认、资料与变更</small></span></button><button data-parent-page="growth"><i>✦</i><span><b>成长档案</b><small>记录每一次成长</small></span></button></nav><div class="member-section-head"><span><small>现在要做</small><h3>待完成事项</h3></span><button data-parent-page="reservations">查看全部</button></div><article class="member-todo-card"><span class="member-todo-icon">✈</span><span><b>补充参营资料</b><small>${state.child} · 新疆自然探索</small><em>截止 8月1日 20:00</em></span><button data-action="confirm-camp">去完成</button></article><div class="member-section-head"><span><small>为 ${state.child} 精选</small><h3>下一段成长旅程</h3></span><button data-parent-page="courses">全部课程</button></div><button class="member-featured-course" data-action="open-course-detail" data-course-key="northeast"><span class="member-featured-image"></span><span class="member-featured-copy"><small>自然探索 · 寒假营</small><b>东北雪境探索营</b><em>在冰雪世界里，发现坚持的力量</em><strong>查看课程详情 <i>›</i></strong></span></button></div>`;
}

const conversations = [
  { key:"collegeNotice", type:"college", title:"X学院服务通知", subtitle:"张小满的参营资料将在2天后锁定", time:"10:28", unread:2, icon:"X", tone:"violet", tag:"X学院" },
  { key:"parentMentor", type:"parent", title:"倪远｜父母成长指导师", subtitle:"关于返家后的家庭任务，我们明晚复盘", time:"昨天", unread:0, icon:"倪", tone:"purple", tag:"父母成长" },
  { key:"childMentor", type:"college", child:"张小满", title:"王老师｜孩子指导师", subtitle:"我已看过小满的参营资料，整体很完整", time:"昨天", unread:1, icon:"王", tone:"blue", tag:"张小满" },
  { key:"campGroup", type:"college", child:"张小满", title:"沙漠营·国庆班家长群", subtitle:"王老师：装备清单已更新，请家长查收", time:"周六", unread:6, icon:"群", tone:"amber", tag:"张小满" },
  { key:"guardian", type:"parent", title:"守护计划", subtitle:"本周家庭练习已更新", time:"周五", unread:0, icon:"守", tone:"green", tag:"父母成长" },
];

function renderChat() {
  const chat=conversations.find(item=>item.key===state.activeChat)||conversations[0];
  const isSystemNotice=chat.key==='collegeNotice';
  const extra=(state.sentMessages[chat.key]||[]).map(text=>`<div class="im-bubble-row mine"><div class="im-bubble">${text}</div></div>`).join('');
  const bodies={
    collegeNotice:`<div class="im-day">今天 10:28</div><article class="im-notice-card"><span class="im-notice-brand">X</span><small>X学院 · 服务通知</small><h3>参营资料即将锁定</h3><p>张小满参加的“沙漠星空探索营·国庆营”将在9月25日18:00锁定名单，请在截止前确认交通、健康与接送信息。</p><div><span><b>4/4</b><small>资料已完成</small></span><button data-action="open-course-detail" data-course-key="desert">查看本期</button></div></article>`,
    parentMentor:`<div class="im-day">昨天 20:16</div><div class="im-bubble-row"><span class="im-mini-avatar purple">倪</span><div class="im-bubble">这次孩子出发前，父母这边可以先完成一次“放手与信任”的家庭练习。明晚我们一起复盘。</div></div><div class="im-bubble-row mine"><div class="im-bubble">好的，我今晚先和孩子聊一下这次出发的期待。</div></div>`,
    childMentor:`<div class="im-context-card"><span>当前服务对象</span><b>张小满 · 沙漠星空探索营</b><small>孩子指导师服务期至2026.10.20</small></div><div class="im-day">昨天 18:42</div><div class="im-bubble-row"><span class="im-mini-avatar blue">王</span><div class="im-bubble">我已看过小满的健康和出行资料，整体很完整。营中我会重点关注他在陌生团队里的主动表达。</div></div><div class="im-bubble-row mine"><div class="im-bubble">谢谢王老师，他刚开始可能会慢热一些。</div></div>`,
    campGroup:`<div class="im-group-notice">群公告：9月25日18:00前完成全部参营资料</div><div class="im-day">周六 16:20</div><div class="im-bubble-row"><span class="im-mini-avatar blue">王</span><div><small class="im-sender">王老师 · 孩子指导师</small><div class="im-bubble">最新装备清单已经发布。沙漠昼夜温差较大，请重点准备轻薄羽绒服和防晒用品。</div></div></div><div class="im-bubble-row"><span class="im-mini-avatar amber">林</span><div><small class="im-sender">林女士 · 张小满妈妈</small><div class="im-bubble">请问水杯容量有要求吗？</div></div></div>`,
    guardian:`<div class="im-day">周五 09:30</div><div class="im-bubble-row"><span class="im-mini-avatar green">守</span><div class="im-bubble">本周家庭练习已更新：请用10分钟完成一次“不评价的倾听”，结束后记录彼此最意外的发现。</div></div>`,
  };
  return `<div class="im-chat-page ${isSystemNotice?'is-system-notice':''}"><header class="im-chat-header"><button data-action="chat-back" aria-label="返回消息列表">‹</button><span><b>${chat.title}</b><small>${chat.key==='campGroup'?'26位成员':chat.tag}</small></span><button aria-label="会话详情">•••</button></header><main class="im-chat-body">${bodies[chat.key]}${isSystemNotice?'':extra}</main>${isSystemNotice?'':`<footer class="im-composer"><button aria-label="更多功能">＋</button><input id="imMessageInput" placeholder="输入消息…"><button data-action="send-message">发送</button></footer>`}</div>`;
}

function renderMessages() {
  if(state.activeChat) return renderChat();
  const filtered=conversations.filter(item=>state.messageFilter==='all'||item.type===state.messageFilter||item.child===state.messageFilter);
  return `<div class="im-inbox"><header class="im-page-header"><h2>消息</h2><button aria-label="发起会话">＋</button></header><div class="im-search">⌕ <span>搜索联系人、群聊和通知</span></div><nav class="im-filter-tabs"><button class="${state.messageFilter==='all'?'is-active':''}" data-message-filter="all">全部</button><button class="${state.messageFilter==='parent'?'is-active':''}" data-message-filter="parent">父母成长</button><button class="${state.messageFilter==='college'?'is-active':''}" data-message-filter="college">X学院</button><button class="${state.messageFilter==='张小满'?'is-active':''}" data-message-filter="张小满">张小满</button></nav><section class="im-conversation-list">${filtered.map(chat=>`<button class="im-conversation" data-chat="${chat.key}"><span class="im-avatar ${chat.tone}">${chat.icon}</span><span class="im-conversation-copy"><span><b>${chat.title}</b><time>${chat.time}</time></span><small>${chat.subtitle}</small><em>${chat.tag}</em></span>${chat.unread?`<i>${chat.unread}</i>`:''}</button>`).join('')}</section></div>`;
}

function renderContacts() {
  const collegeRelations=state.parentHasCollegeEntitlement?`<section class="relationship-card relationship-card--college"><header><span class="relationship-brand">X</span><span><small>孩子成长服务</small><b>X学院</b></span><em>家庭权益已开通</em></header><div class="relationship-child"><span class="relationship-child-avatar">满</span><span><small>张小满 · 当前营期</small><b>沙漠星空探索营</b><em>孩子指导师服务中</em></span></div><button data-chat="childMentor"><span class="contact-avatar blue">王</span><span><b>王老师</b><small>张小满的孩子指导师</small></span><em>发消息 ›</em></button><button data-chat="campGroup"><span class="contact-avatar amber">群</span><span><b>国庆班家长群</b><small>26位家长与营地老师</small></span><em>进入群聊 ›</em></button><div class="relationship-child relationship-child--empty"><span class="relationship-child-avatar muted">安</span><span><small>张小安</small><b>暂无进行中的X学院课程</b></span><button data-action="contact-course">了解课程</button></div></section>`:`<section class="relationship-card relationship-card--college empty"><header><span class="relationship-brand">X</span><span><small>孩子成长服务</small><b>X学院</b></span></header><p>当前家庭账号暂未开通X学院权益，可先浏览课程并联系指导师咨询。</p><button data-action="contact-course">了解X学院课程</button></section>`;
  return `<div class="contacts-page"><header class="im-page-header"><h2>通讯录</h2><button aria-label="联系人管理">♙</button></header><section class="contact-service-shortcuts"><button><i class="contact-icon blue">▣</i><span><b>个案咨询</b><small>父母个人成长支持</small></span><em>›</em></button><button data-chat="guardian"><i class="contact-icon green">ϟ</i><span><b>守护计划</b><small>家庭长期陪伴服务</small></span><em>›</em></button></section><div class="contact-section-title"><small>我的服务关系</small><span>按服务对象区分</span></div><section class="relationship-card relationship-card--parent"><header><span class="relationship-brand parent">家</span><span><small>父母成长服务</small><b>父母成长</b></span><em>长期服务</em></header><button data-chat="parentMentor"><span class="contact-avatar purple">倪</span><span><b>倪远</b><small>父母成长指导师</small></span><em>发消息 ›</em></button></section>${collegeRelations}<div class="contact-section-title"><small>专业支持</small><span>原有联系人</span></div><section class="professional-list"><button><i class="contact-avatar teal">陈</i><span><b>陈毅北</b><small>督导</small></span><em>›</em></button><button><i class="contact-avatar amber">黄</i><span><b>黄树诚</b><small>总督导</small></span><em>›</em></button></section><p class="contact-scope-note">孩子指导师与具体孩子、具体营期绑定；班级群仅在服务期内开放。</p></div>`;
}

function renderProfile() {
  const groups = [[['✉','开营通知书'],['▣','工作坊']],[['◎','我的积分'],['♡','我的收藏']],[['▱','意见反馈'],['☂','售后服务'],['◇','投诉举报']],[['▢','隐私协议']]];
  return `<div class="xz-profile"><header><div class="xz-user xz-user--large"><span class="xz-user__avatar">兴</span><b>测试</b><i>›</i></div></header><div class="xz-profile-body"><section class="child-access-entry ${state.childAccountEnabled?'is-enabled':''}"><div class="child-access-entry__head"><i>子</i><span><small>X学院 · 家庭账号管理</small><b>孩子端管理</b></span><em>${state.childAccountEnabled?'已开通':'待开通'}</em></div><p>${state.childAccountEnabled?'张小满已拥有独立孩子空间，可完成任务、测评并查看成长记录。':'由家长确认并开通孩子端，系统会绑定已有 student_id，不会重复创建成长档案。'}</p><div class="child-access-person"><span>满</span><div><b>张小满</b><small>STU-240381 · ${state.childAccountEnabled?'孩子账号已激活':'等待家长开通'}</small></div><button data-action="child-account-manage">${state.childAccountEnabled?'管理孩子端':'立即开通'}</button></div></section><section class="profile-tools"><button data-action="open-inbox"><i class="profile-icon profile-icon--mail">▱</i><span><b>站内信</b><small>查看系统与服务通知</small></span><em>›</em></button><button data-action="open-scanner"><i class="profile-icon profile-icon--scan">⌗</i><span><b>扫码</b><small>扫描课程、签到或活动二维码</small></span><em>›</em></button></section>${groups.map(group=>`<section>${group.map(([icon,label],index)=>`<button><i class="profile-icon c${index}">${icon}</i><span>${label}</span><em>›</em></button>`).join('')}</section>`).join('')}<button class="logout">退出登录</button><p>版本号：2.3.23</p></div></div>`;
}

function childAccountManageModal(){
  const enabled=state.childAccountEnabled;
  openModal(`<section class="child-access-modal"><span class="eyebrow">家长端 · 孩子账号管理</span><h2>${enabled?'管理张小满的孩子端':'为张小满开通孩子端'}</h2><p class="modal-lead">孩子端绑定已有成长主档 STU-240381。开通不会改变合同、服务资格和预约归属。</p><article class="child-access-subject"><span>满</span><div><small>开通对象</small><b>张小满 · 12岁</b><em>${enabled?'已激活孩子账号':'待家长确认'}</em></div><i>${enabled?'✓':'1'}</i></article>${enabled?`<section class="child-access-enabled"><div><span><small>家庭邀请码</small><b>XM2026</b></span><button data-action="copy-child-invite">复制</button></div><p>孩子首次登录时输入邀请码，验证成功后自动绑定张小满的成长主档。</p></section><div class="child-access-scope"><b>孩子可以使用</b><span>营期任务</span><span>六维自评</span><span>受控消息</span><span>成长档案</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>关闭</button><button class="btn btn--primary" data-action="preview-child-app">进入孩子端预览</button></div>`:`<section class="child-access-rules"><h3>开通后孩子可以</h3><div><i>✓</i><span><b>参与自己的营期任务</b><small>装备检查、营期互动与成长书写</small></span></div><div><i>✓</i><span><b>完成六维自评并查看变化</b><small>数据继续归入同一个 student_id</small></span></div><div><i>✓</i><span><b>使用受监护的消息空间</b><small>仅限指导师、当前班级和系统通知</small></span></div></section><label class="child-access-confirm"><input id="childAccessConfirm" type="checkbox"><span><b>我确认由本人为孩子开通</b><small>合同、资格、预约、健康资料和家庭关系仍只能由家长账号管理。</small></span></label><div class="modal-actions"><button class="btn btn--outline" data-close-modal>暂不开通</button><button class="btn btn--primary" data-action="enable-child-account">确认开通并生成邀请码</button></div>`}</section>`);
}

const courseProfiles = {
  desert: { name:"沙漠星空探索营", series:"自然探索系列", hero:"assets/desert-starry-hero.png", place:"腾格里沙漠", duration:"7天6晚", age:"10–15岁", ratio:"1:5", kicker:"荒野成长", title:"在真实荒野中，建立内在的方向感", lead:"通过沙漠行进、星空观察与团队任务，练习勇气、协作、自我管理和责任承担。", goals:[["✦","面对未知","在变化中保持行动"],["↗","团队协作","表达、倾听与承担"],["◎","自我管理","照顾身体与时间"],["◇","复盘表达","把体验沉淀为认知"]], phases:[["DAY 1–2","进入沙漠 · 建立团队","装备学习、团队契约、低难度徒步适应与个人目标设定。"],["DAY 3–4","协作穿越 · 完成挑战","在专业路线与补给保障下完成分组任务。"],["DAY 5","星空观察 · 安静独处","认识星空与方向，完成独处观察和生命书写。"],["DAY 6–7","成果共创 · 家庭连接","形成返家后可执行的成长行动。"]], safety:"成熟营地路线、专业户外领队、随队医疗保障与每日健康复核共同构成履约闭环。", session:{type:"confirmed",title:"国庆营 · 第03期",date:"2026.10.01–10.07 · 腾格里",status:"已确认参营"} },
  northeast: { name:"东北雪境探索营", series:"自然探索系列", hero:"assets/northeast-snow-hero.png", place:"长白山", duration:"7天6晚", age:"9–15岁", ratio:"1:5", kicker:"冬季韧性", title:"在冰雪世界里，发现坚持的力量", lead:"通过雪地行进、自然观察、冬季协作和生存技能体验，让孩子在专业守护下练习韧性、判断与互助。", goals:[["❄","环境适应","理解身体与自然信号"],["↗","同伴互助","在挑战中彼此支持"],["◎","风险判断","建立安全边界意识"],["◇","坚持完成","分解目标并持续行动"]], phases:[["DAY 1–2","进入雪境 · 冬季适应","装备穿戴、保暖管理和雪地行动基础。"],["DAY 3–4","森林观察 · 协作任务","辨识自然痕迹，完成小组定向挑战。"],["DAY 5–6","韧性挑战 · 团队守护","在安全路线内完成进阶雪地行进。"],["DAY 7","成长复盘 · 家庭分享","把坚持与互助转化为日常行动。"]], safety:"冬季专业装备清单、实时气象监测、成熟雪地路线、领队与医疗保障共同控制风险。", session:{type:"waitlist",title:"寒假营 · 第08期",date:"2027.01.24–01.30 · 长白山",status:"递补待确认"} },
  ocean: { name:"海洋领导力营", series:"领导力成长系列", hero:"assets/ocean-leadership-hero.png", place:"海南海岸", duration:"6天5晚", age:"10–16岁", ratio:"1:6", kicker:"协作领导力", title:"向海而行，学会带领也学会跟随", lead:"在岸线探索、帆船协作和海洋任务中，孩子将体验目标共识、角色分工、沟通反馈与团队决策。", goals:[["≈","目标共识","让团队看见同一方向"],["↗","角色担当","在位置上承担结果"],["◎","沟通反馈","清晰表达并主动校准"],["◇","团队决策","在信息变化中做选择"]], phases:[["DAY 1","认识海洋 · 建立团队","安全规则、角色认识与团队契约。"],["DAY 2–3","岸线探索 · 协作解题","完成观察、采样与问题解决任务。"],["DAY 4–5","帆船协作 · 团队决策","在教练带领下练习分工与协同。"],["DAY 6","成果发布 · 领导力复盘","完成团队项目与个人成长表达。"]], safety:"持证水上教练、全程救生装备、气象与海况监测、岸上医疗支持共同保障课程实施。", session:{type:"completed",title:"暑期营 · 第05期",date:"2026.07.12–07.17 · 海南",status:"已完成"} },
  rainforest: { name:"云南雨林共生营", series:"生态探索系列", hero:"assets/rainforest-exploration-hero.png", place:"西双版纳", duration:"6天5晚", age:"9–14岁", ratio:"1:5", kicker:"生态共生", title:"在万物相连的雨林里，学习观察与敬畏", lead:"从一片叶、一条溪流和一种昆虫开始，孩子在真实生态考察中练习细致观察、提出问题、团队研究与责任行动。", goals:[["⌁","深度观察","从细节发现生态线索"],["?","主动提问","把好奇转化为研究问题"],["◎","系统思考","理解生命之间的连接"],["◇","责任行动","把认知变成保护实践"]], phases:[["DAY 1","进入雨林 · 建立观察方法","认识安全边界、使用观察工具并建立自然笔记。"],["DAY 2–3","溪流调查 · 小组研究","沿成熟路线完成水体与植物观察任务。"],["DAY 4–5","共生课题 · 成果共创","围绕真实生态议题提出并验证小组观点。"],["DAY 6","行动发布 · 家庭连接","形成可带回日常生活的自然守护行动。"]], safety:"成熟研学路线、专业自然导师、全程医疗保障、防虫防雨规范与每日健康复核共同保障课程。", session:{type:"consult",title:"秋季营开放咨询",date:"具体日期与适龄资格由指导师确认",status:"不含在当前权益"} },
  dunhuang: { name:"敦煌人文行走营", series:"人文探索系列", hero:"assets/dunhuang-humanities-hero.png", place:"甘肃敦煌", duration:"7天6晚", age:"10–16岁", ratio:"1:6", kicker:"文明行走", title:"沿着文明的线索，建立更辽阔的世界观", lead:"把历史从书本带回真实地理，在丝路地貌、博物馆研究与主题创作中，理解文明交流、时间尺度与个人表达。", goals:[["⌖","空间认知","在地理中理解历史"],["▤","证据研究","从资料与遗迹形成判断"],["↗","跨文化理解","看见交流带来的改变"],["◇","主题表达","用作品回应真实体验"]], phases:[["DAY 1–2","抵达敦煌 · 建立时间线","通过地图、展陈与城市行走建立丝路框架。"],["DAY 3–4","地貌考察 · 文明解读","在专业讲解下观察地貌与历史线索。"],["DAY 5–6","主题研究 · 创作表达","分组完成研究任务与个人主题作品。"],["DAY 7","成果分享 · 回望旅程","发布作品并形成持续探索计划。"]], safety:"专业人文导师与户外领队共同带队，成熟线路、车辆保障、防晒补水规范和应急医疗全程覆盖。", session:{type:"consult",title:"寒假营开放咨询",date:"具体日期与适龄资格由指导师确认",status:"不含在当前权益"} },
};

const courseConfigIds = {
  desert: "CRS-001",
  northeast: "CRS-002",
  ocean: "CRS-003",
  rainforest: "CRS-004",
  dunhuang: "CRS-005",
};

function getLinkedCourseProfile(key="desert") {
  const profile=courseProfiles[key]||courseProfiles.desert;
  const configured=state.courses.find(course=>course.id===courseConfigIds[key]);
  if(!configured) return profile;
  return {
    ...profile,
    name:configured.name||profile.name,
    hero:configured.hero||profile.hero,
    title:configured.tagline||profile.title,
    series:configured.type||profile.series,
    age:configured.age||profile.age,
  };
}

function courseSessionBlock(course) {
  const s=course.session;
  if(s.type==="consult") return `<article class="my-course-session consult-session"><div><span>课程咨询</span><em class="consult">${s.status}</em></div><h4>${s.title}</h4><p>${s.date}</p><div class="consult-session-note"><i>✦</i><span><b>仍然可以了解和报名</b><small>指导师会确认孩子适龄情况、可选营期与对应费用。</small></span></div><div class="my-session-actions one"><button class="primary" data-action="college-consult">联系指导师咨询</button></div></article>`;
  if(s.type==="locked") return `<article class="my-course-session locked-session"><div><span>我的本期 · ${state.child}</span><em class="locked">${s.status}</em></div><h4>${s.title}</h4><p>${s.date}</p><div class="my-session-progress"><i class="done"></i><i class="done"></i><i class="done"></i><i></i><span>预约成功</span><span>参营确认</span><span>名单锁定</span><span>到营签到</span></div><div class="roster-lock-notice"><i>▣</i><span><b>名单已于 9月25日 18:00 锁定</b><small>营员名单已同步营地执行端，资料和人员变更均需提交申请。</small></span></div><div class="my-session-actions two"><button data-chat="childMentor">联系孩子指导师</button><button class="primary" data-chat="campGroup">进入班级群</button></div></article>`;
  if(s.type==="confirmed") return `<article class="my-course-session"><div><span>我的本期 · ${state.child}</span><em>${s.status}</em></div><h4>${s.title}</h4><p>${s.date}</p><div class="my-session-progress"><i class="done"></i><i class="done"></i><i></i><i></i><span>预约成功</span><span>参营确认</span><span>名单锁定</span><span>到营签到</span></div><div class="my-session-actions one"><button class="primary" data-chat="childMentor">联系孩子指导师</button></div></article>`;
  if(s.type==="waitlist") return `<article class="my-course-session"><div><span>我的候补 · ${state.child}</span><em class="wait">${s.status}</em></div><h4>${s.title}</h4><p>${s.date}</p><div class="waitlist-countdown"><span>递补确认剩余</span><b>08:42:16</b></div><div class="my-session-actions two"><button data-action="decline-waitlist">放弃</button><button class="primary" data-action="waitlist">确认递补</button></div></article>`;
  return `<article class="my-course-session"><div><span>我的历史 · ${state.child}</span><em class="done">${s.status}</em></div><h4>${s.title}</h4><p>${s.date}</p><div class="my-session-actions one"><button class="primary" data-parent-page="growth">查看成长报告</button></div></article>`;
}

function tripMaterialsBlock(course) {
  if(!["confirmed","locked"].includes(course.session.type)) return "";
  const locked=course.session.type==="locked";
  const assessmentDone=locked||state.preAssessmentComplete;
  return `<section class="trip-materials-card ${locked?'is-locked':''}"><div class="trip-materials-head"><span><i></i><b>行前准备</b></span><em>${locked?'资料与成长基线已固化':assessmentDone?'5/5 项已完成':'4/5 项已完成'}</em></div>${locked?`<div class="materials-lock-bar"><i>▣</i><span>当前仅可查看；修改资料需提交审批，成长基线不可反向修改</span></div>`:''}<div class="pre-assessment-position"><i>基</i><span><b>成长基线采集阶段</b><small>参营确认后完成，建议在名单锁定前提交；开营时固化供营后前后对比</small></span></div><div class="trip-material-list"><button data-action="trip-detail" data-trip-type="transport"><span class="trip-icon blue">行</span><span><b>出行信息</b><small>高铁 / 火车 · G87 北京西 → 银川</small></span><em class="complete">${locked?'已锁定':'凭证已传'}</em><i>›</i></button><button data-action="trip-detail" data-trip-type="health"><span class="trip-icon green">健</span><span><b>健康资料</b><small>健康问卷、过敏史与常用药信息</small></span><em class="complete">${locked?'已锁定':'已完成'}</em><i>›</i></button><button data-action="trip-detail" data-trip-type="pickup"><span class="trip-icon amber">接</span><span><b>接送安排</b><small>营地接站 · 银川站南广场</small></span><em>${locked?'已锁定':'已确认'}</em><i>›</i></button><button data-action="trip-detail" data-trip-type="agreement"><span class="trip-icon violet">协</span><span><b>参营协议</b><small>《参营确认及取消规则》V1.1</small></span><em>${locked?'已锁定':'已签署'}</em><i>›</i></button><button class="pre-assessment-item" data-action="pre-camp-assessment"><span class="trip-icon purple">测</span><span><b>入营前六维测评</b><small>父母协助孩子完成 · 建立本期成长基线</small></span><em class="${assessmentDone?'complete':'pending'}">${locked?'已固化':assessmentDone?'已完成':'待完成'}</em><i>›</i></button></div><div class="trip-change-actions"><button data-action="reschedule">申请改期 <small>${locked?'需审批':''}</small></button><button class="danger" data-action="cancel">取消预约 <small>${locked?'需审批':''}</small></button><button class="wide" data-action="change-camper">申请更换参营营员 <small>需审批</small></button></div></section>`;
}

function renderCourseDetail() {
  const source=getLinkedCourseProfile(state.selectedCourse);
  const c=state.sessionDemo==="locked" ? {...source,session:{type:"locked",title:"国庆营 · 第03期",date:"2026.10.01–10.07 · 腾格里",status:"名单已锁定"}} : !state.parentHasCollegeEntitlement&&source.session.type!=="consult" ? {...source,session:{type:"consult",title:"课程开放咨询",date:"适龄资格、可选营期与费用由指导师确认",status:"当前账号无权益"}} : source;
  const consult=c.session.type==='consult', completed=c.session.type==='completed', confirmed=c.session.type==='confirmed', locked=c.session.type==='locked', waitlist=c.session.type==='waitlist';
  const footerSmall=consult?'暂不含在当前权益':completed?'本期已完成':locked?'名单已锁定':confirmed?'出发准备':waitlist?'递补确认剩余':'待完成事项';
  const footerTitle=consult?'可单独咨询报名':completed?'查看成长沉淀':locked?'资料与基线仅可查看':confirmed?`行前准备 ${state.preAssessmentComplete?'5/5':'4/5'}`:waitlist?'08:42:16':'请继续完成参营确认';
  const footerAction=consult?'college-consult':completed?'view-growth':confirmed||locked?'trip-detail':waitlist?'waitlist':'confirm-camp';
  const footerLabel=consult?'联系指导师':completed?'成长报告':confirmed||locked?'查看资料':waitlist?'确认递补':'参营确认';
  return `<div class="immersive-course"><section class="immersive-course__hero"><img src="${c.hero}" alt="${c.name}课程主视觉"><div class="immersive-course__shade"></div><div class="immersive-course__nav"><button data-parent-page="courses" aria-label="返回课程列表">‹</button><button aria-label="分享课程">↗</button></div><div class="immersive-course__hero-copy"><span>X学院 · ${c.series}</span><h1>${c.name}</h1><p>${c.place} · ${c.duration} · ${c.age}</p></div></section><main class="immersive-course__sheet"><div class="sheet-handle"></div>${courseSessionBlock(c)}${tripMaterialsBlock(c)}<span class="course-kicker">${c.kicker}</span><h2>${c.title}</h2><p class="course-lead">${c.lead}</p><section class="course-facts"><div><b>${c.duration}</b><small>沉浸式营期</small></div><div><b>${c.age}</b><small>适龄范围</small></div><div><b>${c.ratio}</b><small>师生配比</small></div></section><section class="course-detail-section"><span class="course-section-no">01 / 成长目标</span><h3>这一次，我们关注什么</h3><div class="growth-goal-grid">${c.goals.map(g=>`<article><i>${g[0]}</i><b>${g[1]}</b><small>${g[2]}</small></article>`).join('')}</div></section><section class="course-detail-section"><span class="course-section-no">02 / 核心体验</span><h3>孩子会经历什么</h3><div class="experience-stack">${c.phases.map(p=>`<article><span>${p[0]}</span><div><b>${p[1]}</b><p>${p[2]}</p></div></article>`).join('')}</div></section><section class="course-detail-section safety-section"><span class="course-section-no">03 / 安全保障</span><h3>探索有边界，成长有守护</h3><p>${c.safety}</p><div class="safety-tags"><span>专业领队</span><span>医疗保障</span><span>应急预案</span><span>每日播报</span></div></section><div class="course-bottom-safe"></div></main><footer class="course-sticky-cta ${consult?'consult-cta':''}"><span><small>${footerSmall}</small><b>${footerTitle}</b></span><button data-action="${footerAction}" ${confirmed||locked?'data-trip-type="transport"':''}>${footerLabel}</button></footer></div>`;
}

function renderReservationHub() {
  const rows=[
    {key:"desert",name:"沙漠星空探索营 · 国庆营",date:"2026.10.01–10.07 · 腾格里",status:"已确认参营",tone:"purple",todo:"查看本期安排"},
    {key:"northeast",name:"东北雪境探索营 · 寒假营",date:"2027.01.24–01.30 · 长白山",status:"递补待确认",tone:"amber",todo:"剩余 08:42:16"},
    {key:"ocean",name:"海洋领导力营 · 暑期营",date:"2026.07.12–07.17 · 海南",status:"已完成",tone:"green",todo:"成长报告已生成"},
  ];
  return `${collegeCompactHeader("我的行程", `查看 ${state.child} 的预约、出发准备与成长结果`)}<div class="mobile-body reservation-hub-new"><section class="reservation-next-hero"><span class="reservation-next-image"></span><div class="reservation-next-copy"><span><small>下一次出发</small><em>已确认参营</em></span><h2>沙漠星空探索营</h2><p>2026.10.01–10.07 · 腾格里</p><div><span><b>48</b><small>天后出发</small></span><button data-action="open-course-detail" data-course-key="desert">查看行程与资料 ›</button></div></div></section><section class="reservation-overview-strip"><span><b>2</b><small>待处理</small></span><span><b>2</b><small>进行中</small></span><span><b>1</b><small>已完成</small></span></section><div class="member-section-head reservation-list-head"><span><small>全部状态</small><h3>课程与营期</h3></span><em>按时间排序</em></div><div class="reservation-hub-guide"><i>i</i><p><b>所有操作回到具体课程完成</b><small>参营确认、补料、改期和取消都会保留在对应营期中。</small></p></div>${rows.map(row=>`<article class="reservation-hub-card reservation-hub-card--new"><div class="reservation-hub-card__head"><span><small>X学院课程</small><b>${row.name}</b></span><em class="${row.tone}">${row.status}</em></div><p>${row.date} · ${state.child}</p><div><small>${row.todo}</small><button data-action="open-course-detail" data-course-key="${row.key}">进入课程 ›</button></div></article>`).join('')}</div>`;
}

const growthDimensionNames=["主动沟通","团队协作","问题解决","自我管理","坚持完成","复盘表达"];
const growthSessionHistory=[
  {name:"云南雨林共生营",period:"2025年8月",short:"雨林营",pre:[46,52,49,58,48,43],post:[58,61,57,65,59,54],story:"开始主动观察同伴，并尝试表达自己的选择。"},
  {name:"东北雪境探索营",period:"2026年2月",short:"雪境营",pre:[56,60,55,64,58,53],post:[68,70,65,72,69,63],story:"在冰雪挑战中增强坚持完成与自我管理。"},
  {name:"海洋领导力营",period:"2026年7月",short:"海洋营",pre:[62,68,60,71,65,58],post:[82,79,74,80,78,76],story:"从参与者走向主动承担，并能完成团队复盘表达。"}
];

function radarPoint(value,index,total=6,cx=150,cy=142,radius=102){
  const angle=-Math.PI/2+index*Math.PI*2/total;
  const scale=value/100;
  return `${(cx+Math.cos(angle)*radius*scale).toFixed(1)},${(cy+Math.sin(angle)*radius*scale).toFixed(1)}`;
}

function radarChartSvg(series,title="六维成长雷达图"){
  const cx=150,cy=142,radius=102,total=growthDimensionNames.length;
  const grids=[20,40,60,80,100].map(level=>`<polygon points="${growthDimensionNames.map((_,index)=>radarPoint(level,index,total,cx,cy,radius)).join(' ')}"></polygon>`).join('');
  const axes=growthDimensionNames.map((_,index)=>`<line x1="${cx}" y1="${cy}" x2="${radarPoint(100,index,total,cx,cy,radius).split(',')[0]}" y2="${radarPoint(100,index,total,cx,cy,radius).split(',')[1]}"></line>`).join('');
  const labels=growthDimensionNames.map((name,index)=>{const angle=-Math.PI/2+index*Math.PI*2/total;const x=cx+Math.cos(angle)*(radius+25);const y=cy+Math.sin(angle)*(radius+25);const anchor=Math.abs(x-cx)<8?'middle':x>cx?'start':'end';return `<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="${anchor}">${name}</text>`;}).join('');
  const polygons=series.map(item=>`<polygon class="radar-series ${item.className}" points="${item.values.map((value,index)=>radarPoint(value,index,total,cx,cy,radius)).join(' ')}"></polygon>${item.showPoints?item.values.map((value,index)=>{const [x,y]=radarPoint(value,index,total,cx,cy,radius).split(',');return `<circle class="radar-point ${item.className}" cx="${x}" cy="${y}" r="3"></circle>`;}).join(''):''}`).join('');
  return `<svg class="growth-radar-svg" viewBox="0 0 300 285" role="img" aria-label="${title}"><title>${title}</title><g class="radar-grid">${grids}${axes}</g><g class="radar-labels">${labels}</g><g>${polygons}</g></svg>`;
}

function growthRadarPanel(sessionIndex=state.growthSessionIndex,interactive=true){
  const current=growthSessionHistory[sessionIndex]||growthSessionHistory[2];
  const previous=growthSessionHistory[sessionIndex-1];
  const series=[];
  if(previous) series.push({values:previous.post,className:"previous",showPoints:false});
  series.push({values:current.pre,className:"baseline",showPoints:false},{values:current.post,className:"result",showPoints:true});
  const average=Math.round(current.post.reduce((sum,value)=>sum+value,0)/current.post.length);
  const averageBefore=Math.round(current.pre.reduce((sum,value)=>sum+value,0)/current.pre.length);
  return `<section class="growth-radar-panel"><div class="growth-radar-head"><span><small>六维成长轨迹</small><h3>看见每一期结束后的变化</h3></span><em>${current.period}</em></div>${interactive?`<nav class="growth-session-tabs" aria-label="选择对比营期">${growthSessionHistory.map((item,index)=>`<button class="${index===sessionIndex?'active':''}" data-growth-session-index="${index}"><b>${item.short}</b><small>${item.period}</small></button>`).join('')}</nav>`:''}<div class="growth-radar-main"><figure>${radarChartSvg(series,`${current.name}六维成长对比`)}<figcaption class="growth-radar-legend">${previous?`<span class="previous"><i></i>上期结营</span>`:''}<span class="baseline"><i></i>本期营前</span><span class="result"><i></i>本期营后</span></figcaption></figure><div class="growth-radar-detail"><div class="growth-average"><span><small>本期结营综合值</small><b>${average}</b></span><em>较营前 +${average-averageBefore}</em></div><div class="growth-dimension-deltas">${growthDimensionNames.map((name,index)=>`<span><b>${name}</b><small>${current.pre[index]} → ${current.post[index]}</small><em>+${current.post[index]-current.pre[index]}</em></span>`).join('')}</div></div></div><div class="growth-history-note"><b>${current.name}</b><span>${current.story}</span>${previous?`<small>灰绿色轮廓为上一期“${previous.name}”结营值，用于观察跨期延续变化。</small>`:'<small>这是当前可查看的第一期记录，后续营期将持续叠加。</small>'}</div></section>`;
}

function preAssessmentResultDrawer(){
  const previous=growthSessionHistory[growthSessionHistory.length-1];
  const currentBaseline=[78,76,72,79,75,73];
  const series=[{values:previous.post,className:"previous",showPoints:false},{values:currentBaseline,className:"baseline-current",showPoints:true}];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">行前准备 · 六维成长基线</span><h2>${state.child} · 沙漠星空探索营</h2><span class="tag green">营前基线已提交</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section assessment-result-radar"><div class="assessment-result-head"><span><small>本期营前基线</small><b>等待结营后形成前后对比</b></span><em>版本 V1 · 2026-08-17</em></div>${radarChartSvg(series,"本期营前基线与上一期结营值对比")}<div class="growth-radar-legend"><span class="previous"><i></i>上期结营</span><span class="baseline-current"><i></i>本期营前</span></div></section><section class="drawer-section"><h3>为什么要保留这张基线图</h3><p>开营时系统会固化当前六维值。结营后由指导师结合营中证据完成营后评估，届时同一张雷达图会叠加“本期营前、本期营后、上期结营”三条轮廓。</p></section><section class="drawer-section course-rule-inherit-note"><i>i</i><div><b>用于观察变化，不用于评价高低</b><p>六维结果不是医学或心理诊断，也不会影响服务资格、营位、名单和签到。</p></div></section>`);
}

function renderGrowthHub() {
  return `${collegeCompactHeader("成长档案", `记录 ${state.child} 在真实经历中的每一次变化`)}<div class="mobile-body growth-hub-new"><section class="growth-profile-hero"><div class="growth-profile-top"><span class="growth-profile-avatar">${state.child.slice(-1)}</span><span><small>长期成长主档</small><b>${state.child}</b><em>student_id · STU-240381</em></span><button data-action="switch-child">切换</button></div><h2>成长不是一次抵达，<br>而是持续看见自己的过程。</h2><div class="growth-profile-stats"><span><b>3</b><small>已完成营期</small></span><span><b>8</b><small>成长证据</small></span><span><b>4</b><small>能力徽章</small></span></div></section>${growthRadarPanel()}<div class="member-section-head growth-timeline-head"><span><small>跨营期沉淀</small><h3>成长时间线</h3></span><em>共 3 期</em></div><div class="growth-timeline-new"><button data-growth-session-index="2"><time>2026<br><small>7月</small></time><span class="growth-record-image ocean"></span><span><small>海洋领导力营</small><b>从“参与者”到主动承担角色</b><p>主动沟通 62 → 82，复盘表达 58 → 76。</p><em>查看六维变化 ›</em></span></button><button data-growth-session-index="1"><time>2026<br><small>2月</small></time><span class="growth-record-icon">◇</span><span><small>东北雪境探索营</small><b>在挑战中增强坚持与自我管理</b><p>坚持完成 58 → 69，自我管理 64 → 72。</p><em>查看六维变化 ›</em></span></button><button data-growth-session-index="0"><time>2025<br><small>8月</small></time><span class="growth-record-icon green">✦</span><span><small>云南雨林共生营</small><b>开始主动观察并表达自己的选择</b><p>主动沟通 46 → 58，团队协作 52 → 61。</p><em>查看六维变化 ›</em></span></button></div></div>`;
}

function courseCatalogCard(key, badge, meta, status, actionLabel, consult=false) {
  const c=getLinkedCourseProfile(key);
  return `<article class="catalog-course-card ${consult?'is-consult':''}"><button class="catalog-course-main" data-action="open-course-detail" data-course-key="${key}"><span class="catalog-course-thumb" style="--course-image:url('${c.hero}')"><i>${badge}</i></span><span class="catalog-course-copy"><small>${consult?'开放咨询':'当前权益可用'}</small><b>${c.name}</b><p>${c.title}</p><span class="catalog-course-meta"><em>${meta}</em><strong>${status}</strong></span></span><i class="catalog-course-arrow">›</i></button></article>`;
}

function renderCourseCatalog() {
  const coreCards=state.parentHasCollegeEntitlement ? `${courseCatalogCard('desert','自然探索','腾格里沙漠 · 7天6晚','已确认参营','课程详情 · 我的本期')}${courseCatalogCard('northeast','自然探索','长白山 · 7天6晚','递补待确认','课程详情 · 处理递补')}${courseCatalogCard('ocean','领导力成长','海南海岸 · 6天5晚','已完成','课程详情 · 成长报告')}` : `${courseCatalogCard('desert','自然探索','腾格里沙漠 · 7天6晚','开放咨询','查看课程 · 联系指导师',true)}${courseCatalogCard('northeast','自然探索','长白山 · 7天6晚','开放咨询','查看课程 · 联系指导师',true)}${courseCatalogCard('ocean','领导力成长','海南海岸 · 6天5晚','开放咨询','查看课程 · 联系指导师',true)}`;
  const included=state.parentHasCollegeEntitlement ? `<section class="course-catalog-section"><div class="catalog-section-title"><div><small>当前家庭权益</small><h3>权益内课程</h3></div><span>可使用剩余 3 次</span></div>${coreCards}</section>` : `<section class="catalog-access-card"><i>✦</i><span><b>当前账号暂未开通家庭权益</b><small>全部课程仍可查看详情，并联系指导师了解报名方式。</small></span><button data-action="college-consult">咨询权益</button></section><section class="course-catalog-section"><div class="catalog-section-title"><div><small>全部开放浏览</small><h3>热门成长课程</h3></div><span>可咨询报名</span></div>${coreCards}</section>`;
  return `${collegeCompactHeader("探索课程", `为 ${state.child} 发现下一段成长旅程`)}<div class="mobile-body course-catalog">${included}<section class="course-catalog-section more-courses"><div class="catalog-section-title"><div><small>不受当前课包限制</small><h3>更多精选课程</h3></div><span>可单独咨询</span></div>${courseCatalogCard('rainforest','生态探索','西双版纳 · 6天5晚','开放咨询','查看课程 · 联系指导师',true)}${courseCatalogCard('dunhuang','人文探索','甘肃敦煌 · 7天6晚','开放咨询','查看课程 · 联系指导师',true)}</section><section class="catalog-bottom-consult"><span><small>没有找到合适的课程？</small><b>告诉指导师孩子的年龄与成长目标</b></span><button data-action="college-consult">帮我推荐</button></section></div>`;
}

function renderCollegePage() {
  if (state.parentPage === "courseDetail") return renderCourseDetail();
  if (state.parentPage === "reservations") return renderReservationHub();
  const pages = {
    home: () => `${collegeCompactHeader("家庭成长权益", `陪伴 ${state.child} 完成出发前的每一步`)}<div class="mobile-body college-inside-home">${renderCollegeHomeTab()}</div>`,
    courses: () => renderCourseCatalog(),
    courseDetail: () => `<div class="immersive-course"><section class="immersive-course__hero"><img src="assets/desert-starry-hero.png" alt="沙漠星空与远行者"><div class="immersive-course__shade"></div><div class="immersive-course__nav"><button data-parent-page="courses" aria-label="返回课程列表">‹</button><button aria-label="分享课程">↗</button></div><div class="immersive-course__hero-copy"><span>X学院 · 自然探索系列</span><h1>沙漠星空探索营</h1><p>腾格里沙漠 · 7天6晚 · 10–15岁</p></div></section><main class="immersive-course__sheet"><div class="sheet-handle"></div><span class="course-kicker">COURSE 01 · 荒野成长</span><h2>在真实荒野中<br>建立内在的方向感</h2><p class="course-lead">不是一次观光旅行，而是在专业团队守护下，让孩子通过沙漠行进、星空观察与团队任务，练习勇气、协作、自我管理和责任承担。</p><section class="course-facts"><div><b>7天6晚</b><small>沉浸式营期</small></div><div><b>10–15岁</b><small>适龄范围</small></div><div><b>1:5</b><small>师生配比</small></div></section><section class="course-detail-section"><span class="course-section-no">01 / 成长目标</span><h3>这一次，我们关注什么</h3><div class="growth-goal-grid"><article><i>✦</i><b>面对未知</b><small>在变化中保持行动</small></article><article><i>↗</i><b>团队协作</b><small>表达、倾听与承担</small></article><article><i>◎</i><b>自我管理</b><small>照顾身体与时间</small></article><article><i>◇</i><b>复盘表达</b><small>把体验沉淀为认知</small></article></div></section><section class="course-detail-section"><span class="course-section-no">02 / 核心体验</span><h3>孩子会经历什么</h3><div class="experience-stack"><article><span>DAY 1–2</span><div><b>进入沙漠 · 建立团队</b><p>装备学习、团队契约、低难度徒步适应与个人目标设定。</p></div></article><article><span>DAY 3–4</span><div><b>协作穿越 · 完成挑战</b><p>在专业路线与补给保障下完成分组任务，练习决策与责任。</p></div></article><article><span>DAY 5</span><div><b>星空观察 · 安静独处</b><p>认识星空与方向，在安全边界内完成独处观察和生命书写。</p></div></article><article><span>DAY 6–7</span><div><b>成果共创 · 家庭连接</b><p>完成团队成果发布，并形成返家后可执行的成长行动。</p></div></article></div></section><section class="course-detail-section safety-section"><span class="course-section-no">03 / 安全保障</span><h3>探索有边界，成长有守护</h3><p>成熟营地路线、专业户外领队、随队医疗保障、每日健康复核与家长端营地播报共同构成履约闭环。</p><div class="safety-tags"><span>专业领队</span><span>医疗随队</span><span>应急预案</span><span>每日播报</span></div></section><section class="course-detail-section session-choice"><span class="course-section-no">04 / 可预约营期</span><h3>为 ${state.child} 选择出发时间</h3><button data-action="book" data-course="沙漠星空探索营"><span><b>国庆营 · 第03期</b><small>2026.10.01–10.07 · 腾格里 · 余 6 位</small></span><em>可预约</em></button><button data-action="join-waitlist" data-course="沙漠星空探索营"><span><b>暑期营 · 第02期</b><small>2026.08.15–08.21 · 腾格里 · 候补 3 人</small></span><em class="wait">候补</em></button></section><div class="course-bottom-safe"></div></main><footer class="course-sticky-cta"><span><small>家庭共享权益</small><b>本次使用 1 次</b></span><button data-action="book" data-course="沙漠星空探索营">选择营期</button></footer></div>`,
    reservations: () => `${collegeHeader("我的预约", "预约成功不等于参营确认，请留意资料截止时间")}<div class="mobile-body"><div class="stepper"><span class="done">预约成功</span><span class="active">参营确认</span><span>名单锁定</span><span>到营签到</span></div><article class="reservation-card"><div class="reservation-card__head"><div><h3>新疆自然探索 · 第12期</h3><p>2026.08.03–08.10 · ${state.child}</p></div><span class="reservation-status">${state.reservationStatus}</span></div><div class="reservation-actions"><button data-action="cancel">取消</button><button data-action="reschedule">改期</button><button class="primary" data-action="confirm-camp">参营确认</button></div></article><article class="reservation-card"><div class="reservation-card__head"><div><h3>东北自然探索 · 第08期</h3><p>2026.08.05–08.11 · ${state.child}</p></div><span class="reservation-status">递补待确认</span></div><div class="reservation-actions"><button data-action="decline-waitlist">放弃</button><button class="primary" data-action="waitlist">确认递补</button></div></article><article class="reservation-card"><div class="reservation-card__head"><div><h3>自然探索 · 云南</h3><p>2025.07.12–07.18 · ${state.child} · 已结营</p></div><span class="reservation-status">已完成</span></div><div class="reservation-actions"><button data-parent-page="growth">查看成长报告</button></div></article></div>`,
    growth: () => renderGrowthHub(),
  };
  return pages[state.parentPage]();
}

function renderParent() {
  const screen = $("#parentScreen");
  if (state.inCollege) screen.innerHTML = renderCollegePage();
  else screen.innerHTML = { heritage: renderHeritageHome, messages: renderMessages, contacts: renderContacts, profile: renderProfile }[state.appTab]();
  screen.scrollTop = 0;
  screen.closest('.phone-frame')?.classList.toggle('course-detail-mode', state.inCollege && state.parentPage === 'courseDetail');
  $$('[data-app-tab]').forEach((el) => el.classList.toggle("is-active", !state.inCollege && el.dataset.appTab === state.appTab || state.inCollege && el.dataset.appTab === 'heritage'));
  $$('[data-parent-page]').forEach((el) => el.classList.toggle("is-active", state.inCollege && el.dataset.parentPage === state.parentPage));
  $$('[data-parent-demo]').forEach((el) => el.classList.toggle("is-active", state.sessionDemo === el.dataset.parentDemo));
  $$('[data-parent-mode]').forEach((el) => el.classList.toggle("is-active", el.dataset.parentMode === (state.inCollege || state.homeTab === 'college' ? 'college' : 'app')));
  const key = state.inCollege ? state.parentPage : state.homeTab === 'college' ? 'collegeHome' : 'app';
  const [title, text] = parentAnnotations[key];
  $("#parentAnnotationTitle").textContent = title;
  $("#parentAnnotationText").textContent = text;
}

function bookingModal(course) {
  openModal(`<span class="eyebrow">营期预约</span><h2>${course} · 第12期</h2><p class="modal-lead">提交前系统会按 V1.1 规则同步校验课程资格、共享权益次数、正式预约时间冲突与实时营位。</p>
    <div class="check-list"><div class="check-row"><i>✓</i><span><b>课程资格</b><small>自然探索成长课包覆盖</small></span><em class="tag green">通过</em></div><div class="check-row"><i>✓</i><span><b>共享权益</b><small>可用 3 次，本次冻结 1 次</small></span><em class="tag green">通过</em></div><div class="check-row"><i>✓</i><span><b>时间冲突</b><small>未发现正式预约重叠</small></span><em class="tag green">通过</em></div><div class="check-row"><i>✓</i><span><b>实时营位</b><small>剩余 6 位</small></span><em class="tag green">通过</em></div></div>
    <div class="modal-actions"><button class="btn btn--outline" data-close-modal>暂不预约</button><button class="btn btn--primary" data-confirm-booking>确认预约</button></div>`);
}

function confirmationModal() {
  openModal(`<span class="eyebrow">参营确认 · 资料 3/4</span><h2>确认本次参营安排</h2><p class="modal-lead">完成后营位将由“预占”转为“正式锁定”，权益继续保持冻结，签到后正式核销。</p>
    <div class="form-grid"><div class="form-field full"><label>交通方式</label><div class="switch-options"><label class="option-card"><input type="radio" name="transport" checked>飞机</label><label class="option-card"><input type="radio" name="transport">高铁</label><label class="option-card"><input type="radio" name="transport">自驾</label><label class="option-card"><input type="radio" name="transport">统一交通</label></div></div><div class="form-field"><label>到达航班</label><input value="CZ6885 · 14:20"></div><div class="form-field"><label>接送人</label><input value="林女士 · 138****3821"></div><div class="form-field full"><label>交通凭证（飞机为必传）</label><input type="file"></div><div class="form-field full"><label>健康与用药补充</label><textarea>无食物过敏；随身携带防晒药膏。</textarea></div></div>
    <label class="option-card" style="margin-top:14px"><input type="checkbox" id="agreementCheck">我已阅读并同意《参营确认及取消规则 V1.1》</label>
    <div class="modal-actions"><button class="btn btn--outline" data-close-modal>保存草稿</button><button class="btn btn--primary" data-submit-confirmation>确认参营</button></div>`);
}

function waitlistModal() {
  openModal(`<span class="eyebrow">递补待确认</span><h2>东北自然探索获得营位</h2><p class="modal-lead">确认窗口剩余 <b style="color:var(--danger)">08:42:16</b>。候补可与正式预约时间冲突，但转为正式预约前必须再次校验。</p>
    <div class="check-list"><div class="check-row error"><i>!</i><span><b>发现时间冲突</b><small>与“新疆自然探索 08.03–08.10”重叠 6 天</small></span><em class="tag red">阻断</em></div></div>
    <div class="modal-actions"><button class="btn btn--outline" data-close-modal>稍后处理</button><button class="btn btn--primary" data-action="reschedule-conflict">先改期冲突营期</button></div>`);
}

function actionModal(type) {
  const locked = state.sessionDemo==="locked" || type !== "reschedule";
  const config = {
    cancel: ["取消预约", locked ? "当前名单已锁定，无法直接取消。提交后进入运营/主管审批，并由审批结果决定权益是否恢复。" : "名单锁定前可自动取消并恢复权益。"],
    reschedule: ["申请改期", "目标营期将重新校验资格、权益、冲突和营位。通过后关闭原预约并创建新预约，不直接修改 session_id。"],
    change: ["更换参营营员", "已确认参营后禁止直接替换 student_id。新营员需重新校验资格、年龄、冲突、营位和资料，原历史不迁移。"],
    material: ["申请变更锁定资料", "名单锁定后，交通、健康或接送资料不能直接覆盖。提交后由运营核验影响范围，并向营地执行岗位同步新版本。"],
  }[type];
  openModal(`<span class="eyebrow">${locked ? "需审批" : "规则校验"}</span><h2>${config[0]}</h2><p class="modal-lead">${config[1]}</p><div class="form-grid"><div class="form-field full"><label>申请原因</label><select><option>疾病或健康原因</option><option>重大交通异常</option><option>家庭行程冲突</option><option>其他特殊情况</option></select></div><div class="form-field full"><label>补充说明</label><textarea placeholder="请说明具体情况，关键变更将完整留痕"></textarea></div><div class="form-field full"><label>证明材料</label><input type="file"></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>返回</button><button class="btn btn--primary" data-submit-request data-request-type="${type}">提交申请</button></div>`);
}

function tripDetailModal(type="transport") {
  const views={
    transport:{eyebrow:"行程与资料 · 出行",title:"往返交通信息",lead:"交通方式与凭证按本营期规则提交。行程发生变化后需重新上传凭证并通知营地接站人员。",body:`<div class="info-grid"><div class="info-item"><span>去程方式</span><b>高铁 / 火车</b></div><div class="info-item"><span>车次</span><b>G87</b></div><div class="info-item"><span>到达站点</span><b>银川站</b></div><div class="info-item"><span>到达时间</span><b>10月1日 14:26</b></div></div><div class="form-field full" style="margin-top:14px"><label>交通凭证</label><input type="file" accept="image/*,.pdf"><small>已上传：去程车票_张小满.jpg</small></div>`},
    health:{eyebrow:"行程与资料 · 健康",title:"健康与用药资料",lead:"健康信息仅向医疗与授权营地岗位开放；发生变化时应在名单锁定前及时更新。",body:`<div class="check-list"><div class="check-row"><i>✓</i><span><b>健康问卷</b><small>已填写 · 2026.09.18 20:16</small></span><em class="tag green">完成</em></div><div class="check-row"><i>✓</i><span><b>过敏与忌口</b><small>花生轻微过敏，已提交处置说明</small></span><em class="tag green">完成</em></div><div class="check-row"><i>✓</i><span><b>常用药品</b><small>无长期用药</small></span><em class="tag green">完成</em></div></div>`},
    pickup:{eyebrow:"行程与资料 · 接送",title:"到离营接送安排",lead:"接站信息会同步给营地执行端；临时变更联系人或到达时间需再次确认。",body:`<div class="info-grid"><div class="info-item"><span>到营方式</span><b>营地统一接站</b></div><div class="info-item"><span>集合地点</span><b>银川站南广场</b></div><div class="info-item"><span>接站时间</span><b>10月1日 15:00</b></div><div class="info-item"><span>紧急联系人</span><b>林女士 138****3821</b></div></div>`},
    agreement:{eyebrow:"行程与资料 · 协议",title:"已签署参营协议",lead:"协议版本、签署人、签署时间与预约快照永久留痕，后续版本更新不会覆盖本次历史。",body:`<div class="agreement-preview"><span>已签署</span><b>《参营确认及取消规则》V1.1</b><small>签署人：林女士 · 2026.09.18 20:21</small><p>包含参营确认、取消与改期、名单锁定、爽约处理、安全告知及隐私授权等条款。</p></div>`}
  };
  const v=views[type]||views.transport;
  const locked=state.sessionDemo==="locked";
  openModal(`<span class="eyebrow">${v.eyebrow}</span><h2>${v.title}</h2><p class="modal-lead">${v.lead}</p>${locked?`<div class="modal-lock-notice"><i>▣</i><span><b>当前资料已随名单锁定</b><small>可查看历史内容；如需修改，请提交资料变更申请。</small></span></div>`:''}${v.body}<div class="modal-actions"><button class="btn btn--outline" data-close-modal>关闭</button><button class="btn btn--primary" data-action="${locked?'request-material-change':'save-trip-material'}">${locked?'申请变更':'保存更新'}</button></div>`);
}

function preCampAssessmentModal(){
  const dimensions=["主动沟通","团队协作","问题解决","自我管理","坚持完成","复盘表达"];
  const descriptions=["遇到陌生同伴时，能主动表达需要并倾听回应","参与团队任务时，能协商分工并承担约定角色","面对变化或困难时，能尝试不同方法寻找解决方案","能管理个人物品、作息和任务时间","遇到挑战时能够持续投入并完成约定目标","经历任务后，能描述发生了什么以及自己的新发现"];
  const scoreLabels=["很少","偶尔","有时","经常","稳定"];
  openModal(`<div class="pre-assessment-form"><span class="eyebrow">行前准备 · 入营前六维测评</span><h2>建立 ${state.child} 的本期成长基线</h2><p class="modal-lead">建议父母与孩子共同完成。请根据孩子近一个月的真实表现作答；结果在开营时固化，用于营后前后对比，不用于筛选或拒绝参营。</p><div class="assessment-stage-flow"><span class="done"><i>1</i><b>参营确认</b></span><em>→</em><span class="active"><i>2</i><b>行前六维测评</b></span><em>→</em><span><i>3</i><b>开营固化基线</b></span><em>→</em><span><i>4</i><b>营后对比报告</b></span></div><div class="assessment-scale-hint"><span>请选择最符合近一个月表现的程度</span><em>1 很少表现　→　5 稳定表现</em></div><div class="assessment-question-list">${dimensions.map((name,index)=>`<section class="assessment-question"><div><b>${index+1}. ${name}</b><small>${descriptions[index]}</small></div><fieldset aria-label="${name}评分">${scoreLabels.map((label,score)=>`<label><input type="radio" name="assessment-${index}" value="${score+1}" ${score===2?'checked':''}><span><b>${score+1}</b><small>${label}</small></span></label>`).join('')}</fieldset></section>`).join('')}</div><label class="assessment-note"><span>父母补充观察（选填）</span><textarea placeholder="可以补充孩子近期的变化、期待或需要指导师关注的内容"></textarea></label><div class="assessment-boundary"><b>测评边界</b><p>该测评是成长观察基线，不是医学或心理诊断；不会影响营位、资格和签到。提交后仍可在开营前发起修订，但每个版本都会保留。</p></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>稍后完成</button><button class="btn btn--primary" data-action="submit-pre-assessment">提交成长基线</button></div></div>`);
}

function renderSCRM() {
  const productRows = [
    ["自然探索成长课包", "PKG-X001", "课包", "26800.00", "已上架", "3个子产品", "自然探索权益 · 5次"],
    ["东北雄鹰户外体验营", "SUB-X101", "子产品", "—", "不单卖", "自然探索成长课包", "东北探索课程"],
    ["沙漠星空探索营", "SUB-X102", "子产品", "—", "不单卖", "自然探索成长课包", "沙漠探索课程"],
    ["云南雨林共生营", "SUB-X103", "子产品", "—", "不单卖", "自然探索成长课包", "雨林探索课程"],
    ["扶摇传承课包", "PKG-X002", "课包", "158000.00", "已下架", "2个子产品", "未映射"],
  ];
  const orderRows = [
    ["D260521-00031", "自然探索成长课包", "东北雄鹰、沙漠星空", "邓扬", "已结清", "HT260522-00031", "22800.00", "已同步"],
    ["D260318-00018", "自然探索成长课包", "东北雄鹰", "曾丹", "已结清", "HT260318-00018", "22000.00", "待订单校验"],
    ["D260131-00009", "自然探索成长课包", "沙漠星空、云南雨林", "杨丽梅", "已结清", "HT260131-00009", "22800.00", "未触发"],
    ["D260126-00142", "自然探索成长课包", "东北雄鹰", "王沙丽", "已结清", "HT260126-00142", "22800.00", "人工处理"],
  ];
  const pages = {
    products: () => `<section class="scrm-flow-banner"><span>上架课包</span><i>→</i><span>配置不单卖子产品</span><i>→</i><span>创建订单选择课包</span><i>→</i><span>选择关联子产品</span><i>→</i><strong>合同与X学院权益</strong></section><section class="table-card scrm-table-card"><div class="scrm-filterbar"><div><select><option>全部产品类型</option><option>课包</option><option>子产品</option></select><select><option>全部销售状态</option><option>已上架</option><option>不单卖</option></select><input placeholder="产品名称 / 编码" aria-label="产品名称关键词"><button class="scrm-query">查询</button><button>重置</button></div><button class="btn btn--primary" data-action="scrm-create-product">＋ 创建产品</button></div><div class="scrm-tip"><b>课包与子产品是两层商品</b><span>课包可以上架销售；子产品不单独售卖，只能在创建订单选择课包后，作为该课包的关联服务项被选择。</span></div><div class="table-scroll"><table class="data-table scrm-dense-table product-relation-table"><thead><tr><th>产品名称</th><th>产品编码</th><th>产品类型</th><th>销售价</th><th>销售状态</th><th>关联关系</th><th>X学院映射</th><th>操作</th></tr></thead><tbody>${productRows.map((row,index)=>`<tr class="${row[2]==='子产品'?'is-child-product':''}"><td><span class="product-name-cell">${row[2]==='子产品'?'<i>└</i>':''}<button class="scrm-link" data-action="scrm-product-detail" data-product-index="${index}">${row[0]}</button></span></td><td>${row[1]}</td><td><span class="product-type ${row[2]==='课包'?'package':'child'}">${row[2]}</span></td><td>${row[3]==='—'?'—':'¥'+row[3]}</td><td><span class="tag ${row[4]==='已上架'?'green':row[4]==='不单卖'?'purple':''}">${row[4]}</span></td><td>${row[5]}</td><td><span class="mapping-chip ${row[6]==='未映射'?'warn':''}">${row[6]}</span></td><td><button class="scrm-text-action" data-action="scrm-product-detail" data-product-index="${index}">查看</button></td></tr>`).join('')}</tbody></table></div></section>`,
    orders: () => `<section class="table-card scrm-table-card"><div class="scrm-filterbar"><div><select><option>全部数据</option></select><select><option>课包名称</option></select><input placeholder="课包 / 子产品" aria-label="订单产品关键词"><select><option>全部订单状态</option><option>已结清</option></select><button class="scrm-query">查询</button><button>重置</button></div><button class="btn btn--primary" data-action="scrm-create-order">＋ 创建订单</button></div><div class="scrm-order-note"><i>i</i><span><b>创建订单时完成组合选择</b><small>先选择一个可售课包，再选择该课包允许关联的一个或多个不单卖子产品。</small></span></div><div class="table-scroll"><table class="data-table scrm-dense-table order-table"><thead><tr><th>订单编号</th><th>销售课包</th><th>已选子产品</th><th>客户名称</th><th>订单状态</th><th>合同编号</th><th>订单金额</th><th>X学院同步</th></tr></thead><tbody>${orderRows.map((row,index)=>`<tr data-scrm-order="${index}"><td><button class="scrm-link" data-scrm-order="${index}">${row[0]}</button></td><td><b>${row[1]}</b></td><td><span class="subproduct-summary">${row[2]}</span></td><td>${row[3]}</td><td><span class="tag green">${row[4]}</span></td><td>${row[5]}</td><td>¥${row[6]}</td><td><span class="sync-state ${row[7]==='已同步'?'done':row[7]==='人工处理'?'error':''}">${row[7]}</span></td></tr>`).join('')}</tbody></table></div></section>`,
    sync: () => `<div class="kpi-grid"><article class="kpi"><span>今日生效订单</span><strong>18</strong><small>课包与子产品组合已锁定</small></article><article class="kpi"><span>同步成功</span><strong>16</strong><small>家庭权益及服务范围已生成</small></article><article class="kpi"><span>等待条件</span><strong>1</strong><small>合同已签但订单待校验</small></article><article class="kpi"><span>人工处理</span><strong>1</strong><small>孩子身份信息冲突</small></article></div><section class="table-card"><div class="card-head"><div><h2>X学院同步记录</h2><small>同步时同时保存销售课包、已选子产品、家庭权益和合同孩子快照</small></div><button class="btn btn--outline" data-action="retry-sync">重试技术失败</button></div><table class="data-table"><thead><tr><th>订单 / 合同</th><th>销售课包</th><th>已选子产品</th><th>家长账号</th><th>权益结果</th><th>状态</th><th>时间</th></tr></thead><tbody><tr><td>D260521-00031<small>HT260522-00031</small></td><td>自然探索成长课包</td><td>东北雄鹰、沙漠星空</td><td>邓扬 · 139****8183</td><td>5次 · 限所选服务范围</td><td><span class="tag green">成功</span></td><td>05-22 15:03</td></tr><tr><td>D260318-00018<small>HT260318-00018</small></td><td>自然探索成长课包</td><td>东北雄鹰</td><td>曾丹 · 134****6462</td><td>尚未生成</td><td><span class="tag amber">等待</span></td><td>03-18 14:20</td></tr><tr><td>D260126-00142<small>HT260126-00142</small></td><td>自然探索成长课包</td><td>东北雄鹰</td><td>王沙丽 · 137****9388</td><td>尚未生成</td><td><span class="tag red">人工处理</span></td><td>01-26 11:27</td></tr></tbody></table></section>`,
    exceptions: () => `<section class="detail-card"><div class="card-head"><div><h2>合同变更影响模拟</h2><small>用于验证延期与终止规则，不会修改真实数据</small></div></div><div class="approval-list"><article class="approval-card"><span class="rule-icon violet">延</span><div><h3>合同延期</h3><p>尚未使用权益有效期同步延期；历史核销记录不变</p></div><button class="btn btn--outline" data-action="extend-contract">模拟延期</button></article><article class="approval-card"><span class="rule-icon red">止</span><div><h3>合同终止</h3><p>待确认预约自动取消；已确认/锁定转“合同异常待处理”</p></div><button class="btn btn--danger" data-action="terminate-contract">模拟终止</button></article></div></section>`,
  };
  $("#scrmContent").innerHTML = (pages[state.scrmPage]||pages.products)();
  const pageMeta={products:["客户关系管理 / 产品管理","产品列表"],orders:["客户关系管理 / 订单管理","订单列表"],sync:["客户关系管理 / 数据同步","X学院同步"],exceptions:["客户关系管理 / 售后管理","合同异常"]}[state.scrmPage]||["客户关系管理","产品列表"];
  $("#scrmCrumb").textContent=pageMeta[0];
  $("#scrmTitle").textContent=pageMeta[1];
  $("#scrmHeaderActions").innerHTML=state.scrmPage==='products'?`<button class="btn btn--primary" data-action="scrm-create-product">＋ 创建产品</button>`:state.scrmPage==='orders'?`<button class="btn btn--outline">导出</button><button class="btn btn--primary" data-action="scrm-create-order">＋ 创建订单</button>`:'';
  $$('[data-scrm-page]').forEach((el) => el.classList.toggle("is-active", el.dataset.scrmPage === state.scrmPage));
}

function scrmCreateProductModal(kind="package"){
  const isPackage=kind==="package";
  const packageFields=`<div class="form-field"><label>标准价 *</label><input value="41200"></div><div class="form-field"><label>销售价 *</label><input value="26800"></div><div class="form-field"><label>销售状态 *</label><select><option>上架</option><option>下架</option></select></div><div class="form-field"><label>权益次数</label><select><option>5次</option><option>3次</option><option>1次</option></select></div><div class="form-field full"><label>允许关联的子产品</label><div class="subproduct-picker compact"><label><input type="checkbox" checked>东北雄鹰户外体验营</label><label><input type="checkbox" checked>沙漠星空探索营</label><label><input type="checkbox" checked>云南雨林共生营</label></div></div>`;
  const childFields=`<div class="form-field"><label>销售方式</label><input value="不单卖" disabled></div><div class="form-field"><label>归属课包 *</label><select><option>自然探索成长课包</option><option>扶摇传承课包</option></select></div><div class="form-field"><label>X学院课程映射 *</label><select><option>东北探索课程</option><option>沙漠探索课程</option><option>雨林探索课程</option></select></div><div class="form-field"><label>服务周期</label><input value="8天"></div>`;
  openModal(`<span class="eyebrow">产品管理</span><h2>创建课包或子产品</h2><p class="modal-lead">课包负责上架与定价；子产品不单卖，用于定义课包成交时可选择的具体服务内容。</p><div class="product-kind-switch"><button class="${isPackage?'is-active':''}" data-scrm-product-kind="package">课包</button><button class="${!isPackage?'is-active':''}" data-scrm-product-kind="child">不单卖子产品</button></div><div class="form-grid"><div class="form-field"><label>产品名称 *</label><input value="${isPackage?'自然探索成长课包':'东北雄鹰户外体验营'}"></div><div class="form-field"><label>产品编码 *</label><input value="${isPackage?'PKG-X001':'SUB-X101'}"></div>${isPackage?packageFields:childFields}<div class="form-field"><label>产品分类</label><select><option>孩子成长产品</option><option>父母成长产品</option></select></div><div class="form-field"><label>合同主体</label><select><option>江西兴家启智教育科技有限公司</option></select></div><div class="form-field full"><label>产品描述</label><textarea>${isPackage?'自然探索成长课包；创建订单时需要从关联范围中选择具体子产品。':'自然探索成长课包下的不单卖服务项，仅能随课包进入订单。'}</textarea></div></div><div class="sync-rule-note"><b>${isPackage?'课包负责价格与权益':'子产品禁止独立销售'}</b><span>${isPackage?'创建订单并明确勾选子产品后，订单、合同和X学院同步保存本次组合快照。':'子产品没有独立售价和上架入口，只映射具体课程并限定课包的服务范围。'}</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="save-scrm-product">保存${isPackage?'课包':'子产品'}</button></div>`);
}

function scrmCreateOrderModal(){
  openModal(`<span class="eyebrow">订单管理 · 创建订单</span><h2>选择课包与关联子产品</h2><p class="modal-lead">先选择客户购买的可售课包，再从该课包的关联范围中选择本次订单包含的子产品。</p><div class="order-compose-steps"><span class="done"><i>1</i>选择客户</span><span class="active"><i>2</i>选择课包</span><span><i>3</i>选择子产品</span><span><i>4</i>确认订单</span></div><div class="form-grid"><div class="form-field"><label>关联客户 *</label><input value="邓扬 · 139****8183"></div><div class="form-field"><label>销售课包 *</label><select id="scrmOrderPackage"><option>自然探索成长课包</option><option>扶摇传承课包</option></select></div><div class="form-field"><label>课包标准价</label><input value="41200" disabled></div><div class="form-field"><label>本次成交价 *</label><input value="22800"></div><div class="form-field full"><label>选择关联子产品 * <small>仅展示“自然探索成长课包”已关联的子产品</small></label><div class="subproduct-picker"><label class="selected"><input type="checkbox" value="东北雄鹰户外体验营" checked> <span><b>东北雄鹰户外体验营</b><small>SUB-X101 · 不单卖</small></span><em>已选择</em></label><label class="selected"><input type="checkbox" value="沙漠星空探索营" checked> <span><b>沙漠星空探索营</b><small>SUB-X102 · 不单卖</small></span><em>已选择</em></label><label><input type="checkbox" value="云南雨林共生营"> <span><b>云南雨林共生营</b><small>SUB-X103 · 不单卖</small></span><em>可选择</em></label></div></div></div><div class="order-compose-summary"><b>本次订单组合</b><span>自然探索成长课包</span><i>＋</i><span>2个子产品</span><em>订单金额 ¥22,800</em></div><div class="sync-rule-note"><b>子产品不单独计价</b><span>价格来自销售课包；所选子产品进入订单和合同快照，并限定后续可使用的X学院服务范围。</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="save-scrm-order">创建订单</button></div>`);
}

function openScrmProductDetail(index){
  const isPackage=index===0||index===4;
  const mapped=index!==4;
  const name=isPackage?(index===0?'自然探索成长课包':'扶摇传承课包'):["","东北雄鹰户外体验营","沙漠星空探索营","云南雨林共生营"][index];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">产品详情 · ${isPackage?'可售课包':'不单卖子产品'}</span><h2>${name}</h2><span class="tag ${isPackage&&index===0?'green':'purple'}">${isPackage?(index===0?'已上架':'已下架'):'不单卖'}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>产品定位</h3><div class="info-grid"><div class="info-item"><span>产品类型</span><b>${isPackage?'课包':'子产品'}</b></div><div class="info-item"><span>销售方式</span><b>${isPackage?'可创建订单':'禁止单独销售'}</b></div><div class="info-item"><span>订单计价</span><b>${isPackage?(index===0?'¥26,800':'¥158,000'):'随课包包含'}</b></div><div class="info-item"><span>合同主体</span><b>江西兴家启智教育科技有限公司</b></div></div></section>${isPackage?`<section class="drawer-section"><h3>允许关联的子产品</h3><div class="selected-subproducts"><span>东北雄鹰户外体验营</span><span>沙漠星空探索营</span><span>云南雨林共生营</span></div><p>创建订单选择本课包后，销售只能从以上关联范围中勾选本次成交包含的子产品。</p></section>`:`<section class="drawer-section"><h3>归属课包</h3><p>自然探索成长课包 · 子产品不能直接上架、单独定价或独立创建订单。</p></section>`}<section class="drawer-section"><h3>X学院映射</h3><p>${mapped?(isPackage?'课包生成父母账号下的5次家庭权益；订单所选子产品限定权益可使用范围。':'子产品映射具体X学院课程，但不独立生成权益次数。'):'当前未映射，不触发X学院权益同步。'}</p></section>`);
}

function openScrmOrderDrawer(){
  $("#drawerContent").classList.add("scrm-wide-drawer");
  const tabs=[['product','产品'],['payment','收款'],['contract','合同'],['profile','客户档案'],['class','开班信息']];
  const bodies={
    product:`<section class="order-tab-panel"><div class="card-head"><div><h3>订单产品组合</h3><small>创建订单时锁定课包与子产品关系</small></div><span class="mapping-chip">自然探索权益 · 5次</span></div><table class="data-table order-product-composition"><thead><tr><th>层级</th><th>产品名称</th><th>产品编码</th><th>销售状态</th><th>订单金额</th></tr></thead><tbody><tr class="package-row"><td><span class="product-type package">课包</span></td><td><b>自然探索成长课包</b></td><td>PKG-X001</td><td>可售</td><td>¥22,800</td></tr><tr><td><span class="product-type child">子产品</span></td><td>└ 东北雄鹰户外体验营</td><td>SUB-X101</td><td>不单卖</td><td>包含</td></tr><tr><td><span class="product-type child">子产品</span></td><td>└ 沙漠星空探索营</td><td>SUB-X102</td><td>不单卖</td><td>包含</td></tr></tbody></table><div class="source-boundary"><b>订单保存本次选择快照</b><p>课包提供价格与权益次数；子产品确定本次成交覆盖的服务范围。具体营期日期和营位仍由后续预约决定。</p></div></section>`,
    payment:`<section class="order-tab-panel"><div class="empty-success">✓<b>订单已结清</b><span>已收金额 ¥22,800 · 未付金额 ¥0</span></div></section>`,
    contract:`<section class="order-tab-panel"><div class="contract-toolbar"><div><b>电子合同</b><p>合同同时读取订单课包、已选子产品和孩子资料</p></div><button class="btn btn--outline">创建电子合同</button></div><table class="data-table contract-table"><thead><tr><th>电子合同名称</th><th>附件名称</th><th>流程状态</th><th>签署时间</th><th>归档时间</th><th>操作</th></tr></thead><tbody><tr><td>青少年产品服务协议</td><td>自然探索成长课包服务协议</td><td><span class="tag green">已归档</span></td><td>2026-05-22 15:02</td><td>2026-05-22 15:03</td><td><button class="scrm-link" data-action="scrm-view-contract">查看签约信息</button></td></tr></tbody></table><div class="contract-sync-card"><div><span class="sync-check">✓</span><span><b>已同步到X学院</b><small>订单结清、合同归档、课包权益及子产品范围四项条件均通过</small></span></div><dl><div><dt>销售课包</dt><dd>自然探索成长课包</dd></div><div><dt>已选子产品</dt><dd>东北雄鹰、沙漠星空</dd></div><div><dt>家庭权益</dt><dd>5次 · 限所选服务范围</dd></div></dl></div></section>`,
    profile:`<section class="order-tab-panel"><div class="info-grid"><div class="info-item"><span>客户姓名</span><b>邓扬</b></div><div class="info-item"><span>手机号</span><b>139****8183</b></div><div class="info-item"><span>省市</span><b>广东省 · 深圳市</b></div><div class="info-item"><span>客户档案</span><b>已关联</b></div></div><div class="source-boundary"><b>家长是账号及合同主体</b><p>订单客户用于匹配父母账号；孩子是合同中的参营对象，两者不能混为同一个身份。</p></div></section>`,
    class:`<section class="order-tab-panel"><div class="empty-state"><b>尚未分配具体营期</b><p>销售成交只生成家庭权益，家长后续在兴智应用中选择孩子和营期完成预约。</p></div></section>`
  };
  openDrawer(`<div class="scrm-order-detail"><header class="order-drawer-head"><button data-close-drawer>×</button><span class="tag green">已结清</span><div class="order-drawer-actions"><button>变更订单产品</button><button>迁移订单</button><button>作废</button></div></header><section class="order-overview"><div><small>订单编号</small><h2>D260521-00031</h2><p>关联客户：邓扬 · 合同编号：HT260522-00031</p></div><div class="order-money"><span><b>¥22,800</b><small>订单金额</small></span><span><b>¥22,800</b><small>已收金额</small></span><span><b>¥0</b><small>未付金额</small></span></div></section><nav class="order-detail-tabs">${tabs.map(([key,label])=>`<button class="${state.scrmOrderTab===key?'is-active':''}" data-scrm-order-tab="${key}">${label}</button>`).join('')}</nav>${bodies[state.scrmOrderTab]||bodies.contract}</div>`);
}

function openScrmContractDrawer(){
  $("#drawerContent").classList.add("scrm-wide-drawer");
  const basic=`<div class="contract-form-grid"><section><h3>签约人与监护信息</h3><div class="readonly-grid"><label>客户姓名<b>邓扬</b></label><label>证件类型<b>中国大陆居民身份证</b></label><label>手机号<b>139****8183</b></label><label>地址<b>广东省深圳市</b></label><label>紧急联系人<b>邓扬</b></label><label>紧急联系电话<b>139****8183</b></label></div></section><section><h3>合同孩子信息</h3><div class="contract-child-card"><span>营员1</span><b>邓景程</b><small>身份证：440***********3216</small><em>匹配已有成长主档 ST109382</em></div><div class="contract-child-card"><span>营员2</span><b>邓景安</b><small>身份证：440***********1842</small><em>新建成长主档 ST109411</em></div><p class="contract-source-hint">合同归档后孩子资料只读；如需变更，必须走补充协议或资料变更申请。</p></section></div>`;
  const course=`<section class="contract-course-panel"><div class="contract-price-summary"><span><small>课包标准价</small><b>¥41,200</b></span><span><small>本次成交价</small><b>¥22,800</b></span></div><table class="data-table contract-product-snapshot"><thead><tr><th>产品层级</th><th>产品名称</th><th>产品编码</th><th>计价方式</th><th>X学院映射</th></tr></thead><tbody><tr class="package-row"><td><span class="product-type package">销售课包</span></td><td><b>自然探索成长课包</b></td><td>PKG-X001</td><td>订单计价</td><td><span class="mapping-chip">家庭权益 · 5次</span></td></tr><tr><td><span class="product-type child">关联子产品</span></td><td>东北雄鹰户外体验营</td><td>SUB-X101</td><td>不单卖</td><td>东北探索课程</td></tr><tr><td><span class="product-type child">关联子产品</span></td><td>沙漠星空探索营</td><td>SUB-X102</td><td>不单卖</td><td>沙漠探索课程</td></tr></tbody></table><div class="sync-rule-note"><b>合同固化订单中的产品组合</b><span>课包决定价格和权益次数，已选子产品限定可使用的课程范围；具体参营孩子与营期仍由家长后续预约时选择。</span></div></section>`;
  openDrawer(`<div class="scrm-contract-detail"><header class="contract-detail-head"><button data-action="scrm-back-order">‹ 返回订单合同项</button><span><small>电子合同 · 已归档</small><h2>青少年产品服务协议</h2></span><em>2026-05-22 15:03</em></header><nav class="contract-form-tabs"><button class="${state.scrmContractTab==='basic'?'is-active':''}" data-scrm-contract-tab="basic">基本信息</button><button class="${state.scrmContractTab==='course'?'is-active':''}" data-scrm-contract-tab="course">报课信息</button></nav>${state.scrmContractTab==='basic'?basic:course}<section class="sync-result-strip"><span>✓</span><div><b>同步结果：家庭权益与服务范围已生成</b><p>父母账号获得5次共享权益，可用于订单选中的“东北雄鹰、沙漠星空”子产品；合同孩子仅作为候选服务对象。</p></div></section></div>`);
}

const reservationRows = [
  {id:"RSV-260817-0142",parent:"林女士",phone:"138****3821",student:"张小满",studentId:"ST109382",course:"沙漠星空探索营",session:"国庆营 · 第03期",dates:"2026.10.01–10.07",status:"待参营确认",stage:"action",material:"交通凭证待补",materialState:"待补资料",entitlement:"已冻结 1 次",seat:"预占 1 位",risk:"确认截止 08-18 20:00",updated:"08-17 15:20"},
  {id:"RSV-260817-0138",parent:"周先生",phone:"136****1028",student:"周可乐",studentId:"ST108992",course:"沙漠星空探索营",session:"国庆营 · 第03期",dates:"2026.10.01–10.07",status:"已确认参营",stage:"confirmed",material:"资料齐全",materialState:"已完成",entitlement:"已冻结 1 次",seat:"正式营位",risk:"无阻断项",updated:"08-17 14:46"},
  {id:"RSV-260817-0129",parent:"林先生",phone:"139****0911",student:"林知夏",studentId:"ST109201",course:"东北雪境探索营",session:"寒假营 · 第08期",dates:"2027.01.24–01.30",status:"候补第 3 位",stage:"waitlist",material:"候补无需补料",materialState:"无需提交",entitlement:"未冻结",seat:"不占营位",risk:"递补后 24 小时确认",updated:"08-17 13:51"},
  {id:"RSV-260816-0116",parent:"赵女士",phone:"139****0911",student:"赵一诺",studentId:"ST109366",course:"云南雨林共生营",session:"暑期营 · 第02期",dates:"2026.08.18–08.23",status:"取消申请中",stage:"approval",material:"疾病证明已上传",materialState:"已完成",entitlement:"冻结待审批",seat:"正式营位待释放",risk:"名单已锁定",updated:"08-17 12:08"},
  {id:"RSV-260816-0109",parent:"陈女士",phone:"137****6620",student:"陈星野",studentId:"ST109244",course:"云南雨林共生营",session:"暑期营 · 第02期",dates:"2026.08.18–08.23",status:"资料变更申请中",stage:"approval",material:"健康资料待复核",materialState:"变更审批中",entitlement:"已冻结 1 次",seat:"正式营位",risk:"随身用药信息变更",updated:"08-17 11:32"},
  {id:"RSV-260815-0097",parent:"王先生",phone:"135****4417",student:"王予安",studentId:"ST109188",course:"海洋领导力营",session:"暑期营 · 第05期",dates:"2026.07.12–07.17",status:"合同异常待处理",stage:"blocked",material:"历史资料只读",materialState:"已锁定",entitlement:"冻结待处理",seat:"历史营位",risk:"来源合同已终止",updated:"08-17 10:32"},
  {id:"RSV-260814-0088",parent:"张先生",phone:"137****5521",student:"张小安",studentId:"ST109411",course:"沙漠星空探索营",session:"国庆营 · 第03期",dates:"2026.10.01–10.07",status:"改期申请中",stage:"approval",material:"目标营期资料待确认",materialState:"待复核",entitlement:"原预约继续冻结",seat:"原营位保留",risk:"目标营期余 3 位",updated:"08-17 09:48"},
  {id:"RSV-260812-0065",parent:"刘女士",phone:"133****2096",student:"刘知夏",studentId:"ST108871",course:"海洋领导力营",session:"暑期营 · 第05期",dates:"2026.07.12–07.17",status:"爽约待核销",stage:"blocked",material:"资料齐全",materialState:"已完成",entitlement:"待核销 1 次",seat:"历史营位",risk:"可申请特殊恢复",updated:"08-17 09:10"}
];

function reservationTable(compact=false) {
  const f=state.reservationFilters;
  const viewFilter={all:()=>true,action:r=>r.stage==='action'||r.materialState.includes('待'),waitlist:r=>r.stage==='waitlist',approval:r=>r.stage==='approval',blocked:r=>r.stage==='blocked'}[state.reservationView]||(()=>true);
  const rows=reservationRows.filter(r=>viewFilter(r)&&(!f.keyword||`${r.id}${r.parent}${r.phone}${r.student}${r.studentId}`.includes(f.keyword))&&(f.course==='全部课程'||r.course===f.course)&&(f.session==='全部营期'||r.session===f.session)&&(f.status==='全部状态'||r.status.includes(f.status))&&(f.material==='全部资料'||r.materialState===f.material)&&(f.entitlement==='全部权益'||r.entitlement.includes(f.entitlement)));
  const counts={all:reservationRows.length,action:reservationRows.filter(r=>r.stage==='action'||r.materialState.includes('待')).length,waitlist:reservationRows.filter(r=>r.stage==='waitlist').length,approval:reservationRows.filter(r=>r.stage==='approval').length,blocked:reservationRows.filter(r=>r.stage==='blocked').length};
  if(compact) return `<section class="table-card reservation-compact"><div class="card-head"><div><h2>近期预约待办</h2><small>仅展示需要关注的预约，完整处理请进入预约中心</small></div><button class="btn btn--outline" data-ops-page="reservations">进入预约中心</button></div><table class="data-table"><thead><tr><th>营员</th><th>课程 / 营期</th><th>预约状态</th><th>当前待办</th><th>更新时间</th></tr></thead><tbody>${reservationRows.filter(r=>r.stage!=='confirmed').slice(0,5).map((r,i)=>`<tr data-reservation-id="${r.id}"><td><div class="cell-person"><span class="mini-avatar">${r.student[0]}</span><span><b>${r.student}</b><small>${r.parent}</small></span></div></td><td><b>${r.course}</b><small>${r.session}</small></td><td><span class="tag ${r.stage==='blocked'?'red':r.stage==='approval'?'amber':'purple'}">${r.status}</span></td><td>${r.risk}</td><td>${r.updated}</td></tr>`).join('')}</tbody></table></section>`;
  return `<section class="reservation-center"><div class="reservation-center-intro"><div><span class="eyebrow">X学院 · 预约履约中枢</span><h2>从预约创建到到营签到，统一管理每一条履约记录</h2><p>预约中心负责状态推进、资格冻结、营位占用、资料完成和异常识别；营期分组仍在“报名与名单”，特殊决定仍进入“审批中心”。</p></div><div class="reservation-center-summary"><span><b>${reservationRows.length}</b><small>全部预约</small></span><span><b>${counts.action}</b><small>需要跟进</small></span><span><b>${counts.waitlist}</b><small>候补中</small></span><span><b>${counts.approval+counts.blocked}</b><small>异常/审批</small></span></div></div><nav class="reservation-view-tabs">${[['all','全部预约'],['action','待处理'],['waitlist','候补'],['approval','申请审批'],['blocked','异常阻断']].map(([key,label])=>`<button class="${state.reservationView===key?'active':''}" data-reservation-view="${key}">${label}<em>${counts[key]}</em></button>`).join('')}</nav><section class="table-card reservation-list-card"><div class="filter-panel reservation-filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="reservationKeyword" class="input" value="${f.keyword}" placeholder="预约号 / 父母 / 手机 / 营员 / student_id"></label><label class="filter-field"><span>课程</span><select id="reservationCourse" class="select">${['全部课程',...new Set(reservationRows.map(r=>r.course))].map(x=>`<option ${x===f.course?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>营期</span><select id="reservationSession" class="select">${['全部营期',...new Set(reservationRows.map(r=>r.session))].map(x=>`<option ${x===f.session?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>预约状态</span><select id="reservationStatus" class="select">${['全部状态','待参营确认','已确认参营','候补','申请中','异常','爽约'].map(x=>`<option ${x===f.status?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>资料状态</span><select id="reservationMaterial" class="select">${['全部资料','已完成','待补资料','待复核','变更审批中','已锁定','无需提交'].map(x=>`<option ${x===f.material?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>权益状态</span><select id="reservationEntitlement" class="select">${['全部权益','已冻结','未冻结','待审批','待处理','待核销'].map(x=>`<option ${x===f.entitlement?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-reservation-filters">重置</button><button class="btn btn--primary" data-action="apply-reservation-filters">查询</button></div></div><div class="reservation-batch-bar"><span>共 <b>${rows.length}</b> 条结果 · 已选择 <b>${state.selectedReservations.size}</b> 条</span><div><button class="btn btn--outline compact" data-action="batch-remind-reservations" ${state.selectedReservations.size?'':'disabled'}>批量提醒</button><button class="btn btn--outline compact">导出当前结果</button></div></div><div class="table-scroll"><table class="data-table reservation-table"><thead><tr><th><input type="checkbox" data-action="select-all-reservations"></th><th>预约 / 家庭</th><th>营员</th><th>课程 / 营期</th><th>预约状态</th><th>权益 / 营位</th><th>资料 / 风险</th><th>更新时间</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td><input type="checkbox" data-reservation-select="${r.id}" ${state.selectedReservations.has(r.id)?'checked':''}></td><td><b>${r.id}</b><small>${r.parent} · ${r.phone}</small></td><td><div class="cell-person"><span class="mini-avatar">${r.student[0]}</span><span><b>${r.student}</b><small>${r.studentId}</small></span></div></td><td><b>${r.course}</b><small>${r.session} · ${r.dates}</small></td><td><span class="tag ${r.stage==='confirmed'?'green':r.stage==='blocked'?'red':r.stage==='approval'?'amber':'purple'}">${r.status}</span></td><td><b>${r.entitlement}</b><small>${r.seat}</small></td><td><b>${r.material}</b><small class="${r.stage==='blocked'||r.stage==='approval'?'risk-text':''}">${r.risk}</small></td><td>${r.updated}</td><td><div class="row-actions"><button data-reservation-id="${r.id}">详情</button>${r.stage==='action'?`<button class="primary" data-action="remind-reservation" data-reservation="${r.id}">提醒</button>`:r.stage==='approval'?`<button class="primary" data-action="reservation-to-approval" data-reservation="${r.id}">查看审批</button>`:r.stage==='waitlist'?`<button class="primary" data-action="reservation-waitlist" data-reservation="${r.id}">候补详情</button>`:''}</div></td></tr>`).join(''):`<tr><td colspan="9"><div class="list-empty">没有符合当前筛选条件的预约</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button disabled>›</button></div></div></section></section>`;
}

function reservationDetailDrawer(id) {
  const r=reservationRows.find(item=>item.id===id);
  if(!r) return;
  const statusTone=r.stage==='confirmed'?'green':r.stage==='blocked'?'red':r.stage==='approval'?'amber':'purple';
  const currentAction=r.stage==='action'?`<button class="btn btn--primary" data-action="remind-reservation" data-reservation="${r.id}">发送参营确认提醒</button>`:r.stage==='approval'?`<button class="btn btn--primary" data-action="reservation-to-approval" data-reservation="${r.id}">进入审批中心处理</button>`:r.stage==='waitlist'?`<button class="btn btn--primary" data-action="reservation-waitlist" data-reservation="${r.id}">查看候补与递补记录</button>`:`<button class="btn btn--outline" data-action="reservation-audit" data-reservation="${r.id}">查看完整操作审计</button>`;
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">预约详情 · ${r.id}</span><h2>${r.student} · ${r.course}</h2><span class="tag ${statusTone}">${r.status}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="reservation-detail-context"><span><small>父母账号</small><b>${r.parent}</b><em>${r.phone}</em></span><i>→</i><span><small>参营营员</small><b>${r.student}</b><em>${r.studentId}</em></span><i>→</i><span><small>具体营期</small><b>${r.session}</b><em>${r.dates}</em></span></section><section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>资格、权益与营位</h3><p>预约创建时形成的资源占用快照</p></div></div><div class="reservation-resource-grid"><article><small>服务资格</small><b>有效</b><em>课程范围校验通过</em></article><article><small>权益状态</small><b>${r.entitlement}</b><em>签到后按规则核销</em></article><article><small>营位状态</small><b>${r.seat}</b><em>候补不占正式营位</em></article><article><small>时间冲突</small><b>${r.stage==='waitlist'?'递补时复核':'校验通过'}</b><em>正式预约禁止冲突</em></article></div></section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>资料与当前待办</h3><p>影响参营确认、名单锁定和现场执行</p></div></div><div class="reservation-material-status"><span class="${r.materialState==='已完成'?'done':r.stage==='blocked'?'blocked':'pending'}"><i>${r.materialState==='已完成'?'✓':r.stage==='blocked'?'!':'·'}</i><b>${r.materialState}</b></span><div><b>${r.material}</b><p>${r.risk}</p></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>03</span><div><h3>状态时间线</h3><p>所有关键变化保留原始时间、来源与操作者</p></div></div><div class="timeline reservation-timeline"><div class="timeline-item"><span class="timeline-dot"></span><span><b>创建预约</b><small>父母端提交 · 资格、课程范围校验通过</small></span><time>08-17 15:20</time></div><div class="timeline-item"><span class="timeline-dot"></span><span><b>${r.stage==='waitlist'?'进入候补队列':'冻结权益并处理营位'}</b><small>${r.entitlement} · ${r.seat}</small></span><time>08-17 15:20</time></div><div class="timeline-item current"><span class="timeline-dot"></span><span><b>${r.status}</b><small>${r.risk}</small></span><time>${r.updated}</time></div></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-action="reservation-open-session" data-reservation="${r.id}">查看营期报名</button>${currentAction}</div></section>`);
}

function courseCreateModal(courseIndex=null) {
  const course=Number.isInteger(courseIndex)?state.courses[courseIndex]:null;
  state.editingCourseIndex=course?courseIndex:null;
  const ages=course?.age?.match(/(\d+).*?(\d+)/)||[null,"10","15"];
  const option=(value,current)=>`<option ${value===current?'selected':''}>${value}</option>`;
  openModal(`<span class="eyebrow">产品中心 · ${course?'编辑课程':'创建课程'}</span><h2>${course?`编辑 ${course.name}`:'创建 X学院课程'}</h2><p class="modal-lead">这里维护的是可复用的课程母版，包括课程定义、适用资格和家长端内容；修改课程不会直接改写任何已创建营期。</p><div class="course-object-boundary"><span><b>当前对象</b><small>X学院课程母版</small></span><i>→</i><span><b>下游对象</b><small>一个课程可创建多个营期</small></span></div><div class="config-section-title"><b>01 基础与权益</b><small>决定课程是什么、谁可以预约</small></div><div class="form-grid"><div class="form-field"><label>课程名称 *</label><input id="courseName" value="${course?.name||''}" placeholder="例如：沙漠星空探索营"></div><div class="form-field"><label>课程类型 *</label><select id="courseType">${["户外成长","领导力","生态探索","人文探索","社会实践","家庭共学"].map(x=>option(x,course?.type||"户外成长")).join('')}</select></div><div class="form-field"><label>适龄下限 *</label><input id="courseAgeMin" type="number" value="${ages[1]}"></div><div class="form-field"><label>适龄上限 *</label><input id="courseAgeMax" type="number" value="${ages[2]}"></div><div class="form-field"><label>适用课包</label><select id="coursePackage">${["自然探索成长课包","领导力成长课包","暂不关联课包"].map(x=>option(x,course?.package||"自然探索成长课包")).join('')}</select></div><div class="form-field"><label>单次权益扣减</label><select><option>1 次</option><option>2 次</option></select></div></div><div class="config-section-title"><b>02 家长端课程详情</b><small>这是所有营期共用的课程内容</small></div><div class="form-grid"><div class="form-field"><label>视觉主题 *</label><input id="courseTheme" value="${course?.theme||''}" placeholder="例如：沙漠星空"></div><div class="form-field"><label>页面模板</label><select><option>沉浸式大图</option><option>图文故事</option><option>标准课程</option></select></div><div class="form-field full"><label>详情页副标题 *</label><input id="courseTagline" value="${course?.tagline||''}" placeholder="一句话说明课程带来的成长价值"></div><div class="form-field full"><label>顶部主视觉 ${course?'':'*'}</label><input type="file" accept="image/*"><small>${course?'不上传则保留当前主视觉':'创建时需配置课程主视觉'}</small></div><div class="form-field full"><label>课程介绍 *</label><textarea id="courseIntro" placeholder="说明课程目标、核心体验与成长价值">${course?.intro||course?.tagline||''}</textarea></div><div class="form-field full"><label>详情模块</label><div class="module-checks"><label><input type="checkbox" checked>成长目标</label><label><input type="checkbox" checked>核心体验</label><label><input type="checkbox" checked>安全保障</label><label><input type="checkbox" checked>可预约营期</label><label><input type="checkbox">导师团队</label><label><input type="checkbox">家长问答</label></div></div></div><div class="course-form-note"><b>${course?'修改影响范围':'发布校验'}</b><span>${course?'保存后仅影响课程母版和后续新建营期；既有营期的时间、地点、负责人、营位及历史预约快照保持不变。':'课程发布后才能在营期管理中被选择；没有营期时家长端只能查看课程内容，不能预约。'}</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--outline" data-save-course="draft">${course?'保存修改':'保存草稿'}</button><button class="btn btn--primary" data-save-course="published">${course?'保存并发布新版本':'保存并发布'}</button></div>`);
}

function coursePageConfigDrawer(courseIndex) {
  state.selectedCourse=['desert','northeast','ocean','rainforest','dunhuang'][courseIndex]||'desert';
  const course=state.courses[courseIndex];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">课程详情页配置</span><h2>${course.name}</h2><span class="tag ${course.detailStatus==='已配置'?'green':'amber'}">${course.detailStatus}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>主视觉与首屏</h3><div class="detail-config-preview" style="--preview-image:url('${course.hero||'assets/desert-starry-hero.png'}')"><span>${course.theme||'待配置主题'}</span><b>${course.name}</b></div><div class="form-field" style="margin-top:12px"><label>顶部主视觉</label><input type="file" accept="image/*"></div><div class="form-field" style="margin-top:12px"><label>成长价值副标题</label><input value="${course.tagline||''}" placeholder="例如：在真实荒野中建立勇气与协作"></div></section><section class="drawer-section"><h3>内容模块与顺序</h3><div class="module-order-list"><div><i>↕</i><span><b>成长目标</b><small>能力标签与本次关注点</small></span><button class="toggle is-on" aria-label="成长目标显示开关"></button></div><div><i>↕</i><span><b>核心体验</b><small>按阶段展示课程旅程</small></span><button class="toggle is-on" aria-label="核心体验显示开关"></button></div><div><i>↕</i><span><b>安全保障</b><small>领队、医疗和应急机制</small></span><button class="toggle is-on" aria-label="安全保障显示开关"></button></div><div><i>↕</i><span><b>可预约营期</b><small>自动读取已发布营期</small></span><button class="toggle is-on" aria-label="可预约营期显示开关"></button></div></div></section><section class="drawer-section"><h3>发布规则</h3><p>详情页发布生成新版本；已创建预约保留当时版本快照，后续修改不覆盖历史事实。</p><div class="drawer-config-actions"><button class="btn btn--outline" data-action="preview-course-detail">预览家长端</button><button class="btn btn--primary" data-action="save-course-page">保存并发布</button></div></section>`);
}

function courseRulesDrawer(courseIndex){
  const course=state.courses[courseIndex];
  const configured=courseIndex<3;
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">X学院课程 · 规则配置</span><h2>${course.name}</h2><span class="tag ${configured?'green':'amber'}">${configured?'已配置':'待配置'}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="course-rule-flow"><span class="done"><i>1</i>创建课程</span><em>→</em><span class="active"><i>2</i>配置默认规则</span><em>→</em><span><i>3</i>创建营期</span></section><section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>预约资格</h3><p>决定哪些服务资格和孩子可以预约本课程</p></div></div><div class="form-grid"><div class="form-field full"><label>适用X学院服务资格 *</label><select><option>自然探索成长课包</option><option>领导力成长课包</option></select></div><div class="form-field"><label>对应订单子产品 *</label><select><option>${course.name}</option></select></div><div class="form-field"><label>适龄范围 *</label><div class="inline-inputs"><input type="number" value="${courseIndex===1?'9':'10'}"><span>至</span><input type="number" value="${courseIndex===2?'16':'15'}"><span>岁</span></div></div><div class="form-field"><label>每次预约扣减</label><select><option>1次</option><option>2次</option></select></div><div class="form-field"><label>合同孩子限制</label><select><option>仅合同登记孩子</option><option>父母账号下全部孩子</option></select></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>预约与候补</h3><p>作为新建营期的默认值，营期可在授权范围内覆盖</p></div></div><div class="setting-row compact"><span><b>正式预约禁止时间冲突</b><small>同一孩子已有重叠正式预约时阻断</small></span><button class="toggle is-on" aria-label="正式预约冲突开关"></button></div><div class="setting-row compact"><span><b>允许进入候补</b><small>候补状态允许时间重叠，递补时再次校验</small></span><button class="toggle is-on" aria-label="候补开关"></button></div><div class="setting-row compact"><span><b>候补确认窗口</b><small>营期未单独配置时使用本课程默认值</small></span><select class="select"><option>24小时</option><option>12小时</option><option>4小时</option></select></div><div class="setting-row compact"><span><b>参营确认期限</b><small>相对开营时间计算</small></span><select class="select"><option>开营前7天</option><option>开营前5天</option><option>开营前3天</option></select></div></section><section class="drawer-section"><div class="rule-section-title"><span>03</span><div><h3>变更与取消</h3><p>统一定义正常规则，特殊情况继续走审批</p></div></div><div class="setting-row compact"><span><b>名单锁定前允许自助改期</b><small>目标营期重新校验资格、冲突和营位</small></span><button class="toggle is-on" aria-label="自助改期开关"></button></div><div class="setting-row compact"><span><b>名单锁定后变更</b><small>取消、改期和换营员统一进入人工审批</small></span><span class="tag amber">必须审批</span></div><div class="setting-row compact"><span><b>爽约默认处理</b><small>特殊原因可审批恢复</small></span><select class="select"><option>核销本次资格次数</option><option>冻结待人工处理</option></select></div></section><section class="course-rule-inherit-note"><i>i</i><div><b>课程规则是默认模板，不直接保存具体日期</b><p>创建营期时继承以上规则；名单锁定时间、交通凭证要求等与具体出发批次有关的参数，仍在营期中配置。已创建预约保留当时规则快照。</p></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-close-drawer>取消</button><button class="btn btn--primary" data-action="save-course-rules">保存课程规则</button></div></section>`);
}

function sessionCreateModal(courseName="") {
  const publishedCourses=state.courses.filter(course=>course.status==="已发布");
  const selected=publishedCourses.find(course=>course.name===courseName)||publishedCourses[0];
  const courseOptions=publishedCourses.map(course=>`<option value="${course.name}" ${course.name===selected?.name?'selected':''}>${course.name}（${course.id}）</option>`).join('');
  openModal(`<span class="eyebrow">营期管理 · 课程实例化</span><h2>新建营期</h2><p class="modal-lead">营期不能脱离课程单独创建。请先选择一门已发布的X学院课程，系统将继承课程默认规则，再补充本期时间、地点和容量。</p><div class="session-create-flow"><span class="done"><i>1</i><b>选择已发布课程</b><small>继承内容与默认规则</small></span><em>→</em><span class="active"><i>2</i><b>创建具体营期</b><small>配置本期履约参数</small></span><em>→</em><span><i>3</i><b>完善营期配置</b><small>负责人、老师与页面</small></span></div>${publishedCourses.length?`<div class="form-grid"><div class="form-field full"><label>所属X学院课程 *</label><select id="sessionCourse">${courseOptions}</select><small>仅展示“已发布”课程；课程内容在课程管理中编辑。</small></div><div class="form-field"><label>营期名称 *</label><input id="sessionName" value="${selected?.name||''} · 第01期"></div><div class="form-field"><label>营地城市 *</label><input id="sessionCity" placeholder="例如：乌鲁木齐"></div><div class="form-field"><label>开营日期 *</label><input id="sessionStart" type="date" value="2026-10-01"></div><div class="form-field"><label>结营日期 *</label><input id="sessionEnd" type="date" value="2026-10-07"></div><div class="form-field"><label>总营位 *</label><input id="sessionCapacity" type="number" value="30"></div><div class="form-field"><label>候补上限</label><input type="number" value="10"></div></div><div class="course-form-note"><b>对象边界</b><span>本页只创建某门课程的一次具体开营批次；修改本期日期、地点和团队不会反向修改课程母版。</span></div>`:`<div class="list-empty"><b>暂无可创建营期的课程</b><span>请先到“X学院课程”创建并发布课程。</span></div>`}<div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button>${publishedCourses.length?`<button class="btn btn--primary" data-action="save-session">创建营期并继续配置</button>`:`<button class="btn btn--primary" data-close-modal>返回课程管理</button>`}</div>`);
}

function sessionManagementPage() {
  const f=state.sessionFilters;
  const rows=campSessions.filter(s=>(!f.keyword||`${s.id}${s.course}${s.name}${s.city}${s.leader}`.includes(f.keyword))&&(f.status==='全部状态'||s.status===f.status));
  const statusOptions=['全部状态','待配置','待发布','报名中','名单锁定','已结束'];
  return `<section class="list-flow-page"><div class="list-flow-intro session-intro"><div><span class="eyebrow">课程实例化履约</span><h2>营期管理</h2><p>每个营期独立配置时间地点、营位、负责人和执行团队，并发布本期开营通知、行前准备与专属日程。</p></div><div class="list-flow-summary qualification"><span><b>${campSessions.length}</b><small>全部营期</small></span><span><b>2</b><small>报名中</small></span><span><b>1</b><small>待完善</small></span><span><b>1</b><small>名单锁定</small></span></div></div><section class="table-card list-flow-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="sessionKeyword" class="input" value="${f.keyword}" placeholder="营期编号 / 课程 / 城市 / 负责人"></label><label class="filter-field"><span>营期状态</span><select id="sessionStatus" class="select">${statusOptions.map(x=>`<option ${x===f.status?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>开营时间</span><select class="select"><option>全部时间</option><option>未来30天</option><option>未来90天</option><option>已结束</option></select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-session-filters">重置</button><button class="btn btn--primary" data-action="apply-session-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 个营期</span><div><button class="btn btn--outline compact">导出</button><button class="btn btn--primary compact" data-action="new-session">＋ 新建营期</button></div></div><div class="table-scroll"><table class="data-table list-flow-table session-list-table"><thead><tr><th>营期</th><th>所属课程</th><th>时间 / 地点</th><th>负责人 / 老师</th><th>营位</th><th>专属页面</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map((s)=>{const index=campSessions.indexOf(s);return `<tr><td><b>${s.name}</b><small>${s.id}</small></td><td>${s.course}</td><td>${s.dates}<small>${s.city}</small></td><td><b>${s.leader}</b><small>${s.teachers}</small></td><td><div class="capacity-mini"><b>${s.confirmed}</b><span>/ ${s.capacity}</span><i style="--capacity:${Math.round(s.confirmed/s.capacity*100)}%"></i></div></td><td><span class="tag ${s.pageStatus==='待配置'?'amber':'purple'}">${s.pageStatus}</span></td><td><span class="tag ${s.status==='报名中'?'green':s.status==='名单锁定'?'amber':s.status==='已结束'?'':'purple'}">${s.status}</span></td><td><div class="row-actions"><button data-action="session-preview" data-session-index="${index}">预览</button><button class="primary" data-action="session-config" data-session-index="${index}">配置营期</button></div></td></tr>`}).join(''):`<tr><td colspan="8"><div class="list-empty">没有符合当前筛选条件的营期</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button disabled>›</button></div></div></section></section>`;
}

function sessionRosterPage() {
  const s=campSessions[state.selectedSession]||campSessions[0];
  const locked=s.status==='名单锁定'||s.status==='已结束';
  const f=state.rosterFilters;
  const rows=sessionRosterRows.filter(r=>(!f.keyword||`${r.name}${r.guardian}${r.phone}`.includes(f.keyword))&&(f.status==='全部状态'||r.status===f.status)&&(f.group==='全部班级'||r.group===f.group)&&(f.material==='全部资料状态'||(f.material==='已完成'?r.material==='已完成':r.material!=='已完成')));
  return `<section class="roster-page"><div class="roster-context"><button class="back-link" data-action="back-session-list">‹ 返回营期列表</button><div><span class="eyebrow">${s.id} · ${s.course}</span><h2>${s.name}报名情况</h2><p>${s.dates} · ${s.city} · 负责人 ${s.leader}</p></div><div class="roster-context__actions"><button class="btn btn--outline" data-action="open-grouping-config">分组规则</button>${locked?`<button class="btn locked-button" disabled>✓ 名单已锁定</button>`:`<button class="btn btn--primary" data-action="lock-session-roster">锁定名单并生成分组</button>`}</div></div>${locked?`<section class="roster-lock-banner"><i>锁</i><span><b>名单已于 2026-08-15 18:00 锁定</b><small>当前分组使用规则版本 V3；新增、移除营员或调整班级均需提交审批，并保留调整前后快照。</small></span><button data-action="view-group-snapshot">查看分组快照</button></section>`:`<section class="roster-prelock-banner"><i>i</i><span><b>锁定前可继续接收报名和调整分组规则</b><small>系统会持续生成分组预览；锁定时才固化正式名单、班组与老师关系。</small></span><button data-action="preview-auto-grouping">重新计算预览</button></section>`}<div class="roster-kpi-grid"><article><span>已预约</span><b>32</b><small>营位 30 + 候补 2</small></article><article><span>已确认参营</span><b>29</b><small>确认率 90.6%</small></article><article><span>待确认</span><b>2</b><small>最晚明日20:00</small></article><article><span>资料完成</span><b>27</b><small class="warn">2人待补充</small></article><article><span>正式分组</span><b>${locked?'3':'0'}</b><small>${locked?'已同步执行端':'当前为预览'}</small></article></div><section class="group-overview"><div class="group-overview__head"><div><h3>${locked?'正式班组':'自动分组预览'}</h3><p>按营期分组规则计算，重点关注营员已纳入风险约束</p></div><span class="tag ${locked?'green':'purple'}">规则 V3 · ${locked?'已固化':'预览中'}</span></div><div class="group-cards"><article><span><b>向日葵1班</b><small>陈毅北 · 孩子指导师</small></span><strong>10<small>/10人</small></strong><em>10–13岁 · 重点关注1人</em></article><article><span><b>向日葵2班</b><small>周岚 · 孩子指导师</small></span><strong>10<small>/10人</small></strong><em>11–15岁 · 重点关注1人</em></article><article><span><b>向日葵3班</b><small>王森 · 孩子指导师</small></span><strong>9<small>/10人</small></strong><em>10–14岁 · 可补1人</em></article></div></section><section class="table-card list-flow-card roster-list-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索营员</span><input id="rosterKeyword" class="input" value="${f.keyword}" placeholder="营员 / 监护人 / 手机号"></label><label class="filter-field"><span>参营状态</span><select id="rosterStatus" class="select">${['全部状态','已确认参营','待参营确认','取消申请中','候补中'].map(x=>`<option ${x===f.status?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>班级</span><select id="rosterGroup" class="select">${['全部班级','向日葵1班','向日葵2班','向日葵3班','待分组','候补不分组'].map(x=>`<option ${x===f.group?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>资料状态</span><select id="rosterMaterial" class="select">${['全部资料状态','已完成','待补充'].map(x=>`<option ${x===f.material?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-roster-filters">重置</button><button class="btn btn--primary" data-action="apply-roster-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 条结果 · 已选择 0 人</span><div><button class="btn btn--outline compact">导出名单</button>${locked?`<button class="btn btn--outline compact" data-action="request-regroup">申请调整分组</button>`:`<button class="btn btn--outline compact" data-action="manual-group">手动调整预览</button>`}</div></div><div class="table-scroll"><table class="data-table roster-table"><thead><tr><th><input type="checkbox"></th><th>营员</th><th>监护人</th><th>参营状态</th><th>资料 / 交通</th><th>服务资格</th><th>分组结果</th><th>重点关注</th><th>操作</th></tr></thead><tbody>${rows.map(r=>`<tr><td><input type="checkbox"></td><td><div class="cell-person"><span class="mini-avatar">${r.name.slice(0,1)}</span><span><b>${r.name}</b><small>${r.age}岁 · student_id已匹配</small></span></div></td><td>${r.guardian}<small>${r.phone}</small></td><td><span class="tag ${r.status==='已确认参营'?'green':r.status==='候补中'?'purple':'amber'}">${r.status}</span></td><td>${r.material}<small>${r.transport}</small></td><td>${r.qualification}</td><td><b>${r.group}</b><small>${r.mentor}</small></td><td><span class="risk-text ${r.risk==='无'?'muted':''}">${r.risk}</span></td><td><div class="row-actions"><button data-action="view-roster-person">详情</button>${locked?`<button data-action="request-regroup">申请换班</button>`:`<button data-action="manual-group">调班</button>`}</div></td></tr>`).join('')}</tbody></table></div></section></section>`;
}

function sessionConfigDrawer(sessionIndex=state.selectedSession) {
  state.selectedSession=sessionIndex;
  const s=campSessions[sessionIndex]||campSessions[0];
  const tab=state.sessionConfigTab;
  const startDate=s.dates.split('–')[0].replaceAll('.','-');
  const endDate=`${s.dates.slice(0,4)}.${s.dates.split('–')[1]}`.replaceAll('.','-');
  const tabs=`<nav class="session-config-tabs"><button class="${tab==='basic'?'active':''}" data-session-config-tab="basic">基本配置</button><button class="${tab==='team'?'active':''}" data-session-config-tab="team">负责人和老师</button><button class="${tab==='grouping'?'active':''}" data-session-config-tab="grouping">分组规则</button><button class="${tab==='itinerary'?'active':''}" data-session-config-tab="itinerary">营程任务</button><button class="${tab==='pages'?'active':''}" data-session-config-tab="pages">本期专属页面</button></nav>`;
  const basic=`<section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>时间与地点</h3><p>决定本期的预约、出发和履约边界</p></div></div><div class="form-grid"><div class="form-field full"><label>所属课程</label><input value="${s.course}" disabled></div><div class="form-field"><label>营期名称 *</label><input value="${s.name}"></div><div class="form-field"><label>营地城市 *</label><input value="${s.city}"></div><div class="form-field"><label>开营日期 *</label><input type="date" value="${startDate}"></div><div class="form-field"><label>结营日期 *</label><input type="date" value="${endDate}"></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>营位与关键时间</h3><p>本期参数覆盖课程默认值，但不修改课程模板</p></div></div><div class="form-grid"><div class="form-field"><label>总营位 *</label><input type="number" value="${s.capacity}"></div><div class="form-field"><label>候补上限</label><input type="number" value="10"></div><div class="form-field"><label>参营确认截止</label><input type="datetime-local" value="2026-09-20T20:00"></div><div class="form-field"><label>名单锁定时间</label><input type="datetime-local" value="2026-09-25T18:00"></div></div><div class="inherit-rule-hint"><i>✓</i><span><b>已继承课程默认规则</b><small>候补24小时、正式预约冲突校验、锁定后变更走审批</small></span><button data-action="course-rules" data-course-index="0">查看</button></div></section>`;
  const team=`<section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>营期责任人</h3><p>负责人拥有本期配置、发布和异常协调权限</p></div></div><div class="form-grid"><div class="form-field"><label>营期负责人 *</label><select><option>${s.leader}</option><option>周岚</option><option>王森</option></select></div><div class="form-field"><label>营长 *</label><select><option>何川</option><option>李航</option></select></div><div class="form-field"><label>教务统筹</label><select><option>苏宁</option><option>林悦</option></select></div><div class="form-field"><label>医疗负责人</label><select><option>许医生</option><option>陈医生</option></select></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>营期老师与分组</h3><p>老师先加入本期，再分配至班级或具体岗位</p></div></div><div class="session-staff-list"><div><span class="mini-avatar">陈</span><span><b>陈毅北</b><small>孩子指导师 · 向日葵1班</small></span><em class="tag green">已加入</em></div><div><span class="mini-avatar">周</span><span><b>周岚</b><small>课程导师 · 向日葵2班</small></span><em class="tag green">已加入</em></div><div><span class="mini-avatar">王</span><span><b>王森</b><small>户外领队 · 全营</small></span><em class="tag purple">跨班</em></div></div><button class="btn btn--outline wide" data-action="add-session-staff">＋ 添加营期老师</button></section>`;
  const teamWithAssistants=team.replace("营期老师与分组","营期教师、助教与分组").replace("老师先加入本期，再分配至班级或具体岗位","教师与助教先加入本期，再分配至班级、营员小组或具体岗位").replace('</div><button class="btn btn--outline wide" data-action="add-session-staff">＋ 添加营期老师</button>','<div class="session-role-divider"><span>助教配置</span><small>协助签到、带队、素材采集与生活管理；不默认拥有审批和敏感资料权限</small></div><div><span class="mini-avatar assistant">苏</span><span><b>苏宁</b><small>营地助教 · 向日葵1班 · 签到/素材</small></span><em class="tag green">已加入</em></div><div><span class="mini-avatar assistant">赵</span><span><b>赵可</b><small>营地助教 · 向日葵2班 · 生活管理</small></span><em class="tag green">已加入</em></div></div><div class="staff-role-summary"><span><b>3</b><small>教师/导师</small></span><span><b>2</b><small>助教</small></span><span><b>1:5</b><small>综合师生比</small></span></div><button class="btn btn--outline wide" data-action="add-session-staff">＋ 添加教师 / 助教</button>');
  const grouping=`<section class="drawer-section"><div class="group-rule-status"><span><b>自动分组规则 V3</b><small>${s.status==='名单锁定'?'名单已锁定，当前版本已固化':'锁定名单时自动生成正式分组'}</small></span><em class="tag ${s.status==='名单锁定'?'amber':'green'}">${s.status==='名单锁定'?'只读快照':'可编辑'}</em></div><div class="rule-section-title"><span>01</span><div><h3>班级容量与师生比</h3><p>属于硬约束，自动分组不得突破</p></div></div><div class="form-grid"><div class="form-field"><label>每班目标人数 *</label><input type="number" value="10"></div><div class="form-field"><label>每班最大人数 *</label><input type="number" value="12"></div><div class="form-field"><label>孩子指导师人数 *</label><input type="number" value="2"></div><div class="form-field"><label>最大师生比</label><select><option>1 : 5</option><option>1 : 6</option></select></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>分组优先级</h3><p>从上到下依次满足，冲突时以安全约束优先</p></div></div><div class="group-priority-list"><div><i>1</i><span><b>重点关注营员均衡</b><small>过敏、随身用药等营员分散到具备对应能力的班组</small></span><em class="tag red">硬规则</em></div><div><i>2</i><span><b>年龄结构均衡</b><small>各班平均年龄差不超过1岁</small></span><em class="tag purple">高优先</em></div><div><i>3</i><span><b>同行关系</b><small>兄弟姐妹或合同备注同行可配置同班/不同班</small></span><em class="tag purple">高优先</em></div><div><i>4</i><span><b>性别比例均衡</b><small>仅在业务具备合法必要字段时启用</small></span><button class="toggle"></button></div><div><i>5</i><span><b>随机打散原有关系</b><small>避免熟人过度集中，促进新团队建立</small></span><button class="toggle is-on"></button></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>03</span><div><h3>冲突与人工兜底</h3><p>自动分组无法同时满足全部规则时的处理方式</p></div></div><div class="setting-row compact"><span><b>存在硬规则冲突时阻断锁定</b><small>必须由营期负责人处理后才能生成正式名单</small></span><button class="toggle is-on"></button></div><div class="setting-row compact"><span><b>允许人工调整预览</b><small>调整需填写原因，锁定后转审批</small></span><button class="toggle is-on"></button></div><button class="btn btn--outline wide" data-action="preview-auto-grouping">按当前规则计算分组预览</button></section>`;
  const itinerary=`<section class="drawer-section"><div class="task-source-summary"><span><b>营程任务模板</b><small>7天 · 26项任务 · 已分配6类岗位</small></span><button class="btn btn--primary compact" data-action="new-camp-task">＋ 添加任务</button></div><div class="task-source-tags"><span>日程任务 18</span><span>业务节点 4</span><span>风险提醒 3</span><span>人工任务 1</span></div></section><section class="drawer-section"><div class="day-switcher"><button class="active">第1天</button><button>第2天</button><button>第3天</button><button>第4–7天</button></div><div class="itinerary-task-list"><article><time>08:30</time><i class="violet">签</i><span><b>到营签到与健康复核</b><small>集合大厅 · 孩子指导师 · 全员完成即结束</small></span><em class="tag green">已启用</em><button data-action="edit-camp-task">编辑</button></article><article><time>10:00</time><i class="blue">课</i><span><b>破冰与团队契约</b><small>活动室A · 课程导师 · 上传小组契约</small></span><em class="tag green">已启用</em><button data-action="edit-camp-task">编辑</button></article><article><time>12:00</time><i class="amber">险</i><span><b>午餐与过敏提醒</b><small>餐厅 · 孩子指导师 · 重点营员复核</small></span><em class="tag amber">风险触发</em><button data-action="edit-camp-task">编辑</button></article><article><time>20:30</time><i class="green">记</i><span><b>当日成长记录</b><small>各班活动室 · 孩子指导师 · 每人至少1条</small></span><em class="tag purple">自动生成</em><button data-action="edit-camp-task">编辑</button></article><article><time>21:00</time><i class="orange">播</i><span><b>家长端营地播报</b><small>营期负责人 · 审核后发布至班级群</small></span><em class="tag purple">业务节点</em><button data-action="edit-camp-task">编辑</button></article></div></section><section class="course-rule-inherit-note"><i>i</i><div><b>发布营期后生成每日任务实例</b><p>任务按日期、班级和岗位分发；资料缺失、健康风险等实时事件会追加任务，原模板版本和完成记录永久保留。</p></div></section>`;
  const pages=`<section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>家长端本期专属页面</h3><p>内容仅作用于当前营期，可定时发布并通过兴智IM触达</p></div></div><div class="session-page-list"><article><i class="notice">启</i><span><b>开营通知</b><small>集合信息、营地介绍、负责人联系方式</small></span><em class="tag amber">待发布</em><button data-action="edit-session-notice">配置</button></article><article><i class="ready">备</i><span><b>行前准备</b><small>装备清单、交通凭证、健康资料提醒</small></span><em class="tag green">已发布</em><button data-action="session-preview" data-session-index="${sessionIndex}">预览</button></article><article><i class="schedule">程</i><span><b>营期日程</b><small>每日主题与活动安排，可隐藏具体安全点位</small></span><em class="tag purple">草稿</em><button>编辑</button></article><article><i class="group">群</i><span><b>班级群说明</b><small>入群时间、沟通边界与播报频率</small></span><em class="tag green">已发布</em><button>编辑</button></article></div></section><section class="course-rule-inherit-note"><i>i</i><div><b>发布后进入家长端“我的本期”，并同步消息提醒</b><p>开营通知、资料补充和名单锁定等重要节点同时写入站内信；班级群只承载沟通，不替代正式业务状态。</p></div></section>`;
  const communication=`<section class="drawer-section camp-content-overview"><div class="rule-section-title"><span>01</span><div><h3>营地播报体系</h3><p>对应 OPS-005：相册、文字、短视频、公众号文章和重要活动直播统一管理</p></div></div><div class="broadcast-kpi-grid"><article><small>本期已发布</small><b>12</b><em>相册 5 · 文字 5 · 视频 2</em></article><article><small>待审核</small><b>3</b><em>区长/营长审核后发布</em></article><article><small>家长阅读率</small><b>87%</b><em>已读 26 / 30 个家庭</em></article></div><div class="broadcast-type-grid"><button data-action="create-broadcast" data-broadcast-type="album"><i>册</i><span><b>相册播报</b><small>摄影师每日精选照片</small></span><em>5条</em></button><button data-action="create-broadcast" data-broadcast-type="text"><i>文</i><span><b>文字播报</b><small>指导师每日3次文字记录</small></span><em>5条</em></button><button data-action="create-broadcast" data-broadcast-type="video"><i>视</i><span><b>视频播报</b><small>每日精华短视频</small></span><em>2条</em></button><button data-action="create-broadcast" data-broadcast-type="article"><i>号</i><span><b>公众号文章</b><small>每期2–3篇深度内容</small></span><em>1篇</em></button><button data-action="create-broadcast" data-broadcast-type="live"><i>播</i><span><b>直播播报</b><small>重要活动直播与回放</small></span><em>未开始</em></button></div><div class="broadcast-review-flow"><span class="done"><i>1</i><b>素材提交</b></span><em>→</em><span class="active"><i>2</i><b>营长审核</b></span><em>→</em><span><i>3</i><b>发布家长端</b></span><em>→</em><span><i>4</i><b>阅读统计</b></span></div><button class="btn btn--outline wide" data-action="preview-broadcast-list">查看播报时间轴与审核记录</button></section><section class="drawer-section camp-report-overview"><div class="rule-section-title"><span>02</span><div><h3>营后报告</h3><p>对应 OPS-006：整合六维测评、营期行为、徽章、照片视频与满意度问卷</p></div></div><div class="report-readiness"><div><span><b>报告数据准备度</b><small>29名营员 · 已完成24份 · 5份待补</small></span><strong>83%</strong></div><i><em style="--report-ready:83%"></em></i></div><div class="report-source-grid"><span class="done">入营前六维测评<em>29/29</em></span><span class="done">营期行为记录<em>186条</em></span><span class="warn">结营六维测评<em>24/29</em></span><span class="done">徽章授予记录<em>47枚</em></span><span class="done">照片/视频素材<em>326份</em></span><span class="warn">家长满意度问卷<em>21/29</em></span></div><div class="report-output-list"><article><i>个</i><span><b>个人成长报告 PDF</b><small>六维雷达图前后对比 + 指导师评语 + 成长证据</small></span><em class="tag amber">24/29已生成</em><button data-action="preview-camp-report">预览</button></article><article><i>班</i><span><b>班级总结报告</b><small>班级表现、共同成长主题与精选内容</small></span><em class="tag purple">草稿</em><button data-action="preview-class-report">编辑</button></article><article><i>章</i><span><b>徽章与满意度统计</b><small>徽章清单、问卷统计与报告推送记录</small></span><em class="tag green">数据已汇总</em><button data-action="report-statistics">查看</button></article></div><button class="btn btn--primary wide" data-action="generate-camp-reports">生成缺失的5份个人报告</button></section>`;
  const broadcastOnly=communication.split('<section class="drawer-section camp-report-overview">')[0];
  const enhancedTabs=tabs.replace("负责人和老师","执行团队").replace('</nav>','<button class="'+(tab==='communication'?'active':'')+'" data-session-config-tab="communication">播报管理</button></nav>');
  const tabContent=tab==='basic'?basic:tab==='team'?teamWithAssistants:tab==='grouping'?grouping:tab==='itinerary'?itinerary:tab==='pages'?pages:broadcastOnly;
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">${s.id} · 营期配置</span><h2>${s.name}</h2><span class="tag ${s.status==='报名中'?'green':'purple'}">${s.status}</span></div><button class="drawer__close" data-close-drawer>×</button></div><div class="session-config-context"><b>${s.course}</b><span>${s.dates} · ${s.city}</span></div>${enhancedTabs}${tabContent}<section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-close-drawer>取消</button><button class="btn btn--primary" data-action="save-session-config">保存营期配置</button></div></section>`);
  $("#drawerContent").classList.add("session-config-drawer");
}

function sessionStaffPickerModal(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">营期执行团队</span><h2>添加教师或助教</h2><span class="tag purple">单层抽屉</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><p class="modal-lead">先选择本期角色，再按资质、可用档期与班组需要筛选。助教只获得被分配任务和必要营员信息权限。</p><div class="staff-picker-filters"><label><span>角色类型</span><select id="sessionStaffRole"><option>营地助教</option><option>孩子指导师</option><option>课程导师</option><option>户外领队</option><option>摄影师</option></select></label><label><span>档期</span><select><option>本营期可用</option><option>存在部分冲突</option></select></label><label><span>资质</span><select><option>全部资质</option><option>急救证</option><option>户外带队</option><option>摄影/视频</option></select></label></div></section><section class="drawer-section"><div class="staff-picker-list"><label><input type="checkbox" checked><span class="mini-avatar assistant">吴</span><span><b>吴桐</b><small>营地助教 · 急救培训 · 本期全程可用</small></span><em class="tag green">推荐</em></label><label><input type="checkbox"><span class="mini-avatar assistant">赵</span><span><b>赵可</b><small>营地助教 · 生活管理 · 10月4日晚有冲突</small></span><em class="tag amber">部分冲突</em></label><label><input type="checkbox"><span class="mini-avatar">林</span><span><b>林悦</b><small>孩子指导师 · 户外带队资质 · 本期全程可用</small></span><em class="tag green">可用</em></label></div><div class="form-grid"><div class="form-field"><label>分配班组</label><select><option>向日葵1班</option><option>向日葵2班</option><option>全营机动</option></select></div><div class="form-field"><label>主要职责</label><select><option>签到与素材采集</option><option>生活管理</option><option>活动协助</option><option>交通接送</option></select></div></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-action="back-session-team">返回执行团队</button><button class="btn btn--primary" data-action="confirm-add-session-staff">确认加入本期</button></div></section>`);
  $("#drawerContent").classList.add("session-config-drawer");
}

function campBroadcastEditor(type="album"){
  const typeNames={album:"相册播报",text:"文字播报",video:"视频播报",article:"公众号文章",live:"直播播报"};
  openModal(`<span class="eyebrow">OPS-005 · 营地播报</span><h2>新建${typeNames[type]||"营地播报"}</h2><p class="modal-lead">内容提交后进入营长审核，审核通过才会发布至家长端播报时间轴和对应班级群提醒。</p><div class="form-grid"><div class="form-field"><label>播报范围</label><select><option>全营家长</option><option>向日葵1班</option><option>向日葵2班</option></select></div><div class="form-field"><label>计划发布时间</label><input type="datetime-local" value="2026-10-01T21:00"></div><div class="form-field full"><label>播报标题 *</label><input value="第1天 · 我们顺利抵达营地"></div><div class="form-field full"><label>文字内容 *</label><textarea rows="5">孩子们已顺利抵达营地并完成签到、健康复核与团队破冰。今天的精选瞬间将在审核后同步给家长。</textarea></div><div class="form-field full"><label>照片 / 视频素材</label><div class="broadcast-upload-grid"><button>＋ 上传照片</button><button>＋ 上传短视频</button><span>已选择 12 张照片 · 1 段视频</span></div></div></div><div class="broadcast-audit-note"><b>发布前检查</b><span>不展示其他家庭敏感信息</span><span>不暴露住宿房号和实时安全点位</span><span>已获得可发布素材授权</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>保存草稿</button><button class="btn btn--primary" data-action="submit-broadcast-review">提交营长审核</button></div>`);
}

function broadcastTimelineDrawer(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">OPS-005 · 营地播报体系</span><h2>播报时间轴与审核记录</h2><span class="tag green">家长阅读率 87%</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section broadcast-timeline"><article><time>今天 21:00</time><i class="album">册</i><span><b>第1天 · 顺利抵达营地</b><small>相册12张 · 全营家长 · 李航审核</small></span><em class="tag green">已发布</em></article><article><time>今天 18:30</time><i class="text">文</i><span><b>破冰任务完成情况</b><small>文字播报 · 向日葵1班 · 待营长审核</small></span><em class="tag amber">待审核</em></article><article><time>今天 15:10</time><i class="video">视</i><span><b>团队契约精华视频</b><small>短视频 01:26 · 摄影师提交</small></span><em class="tag purple">审核中</em></article></section><section class="drawer-section"><h3>家长阅读统计</h3><div class="broadcast-reader-stats"><span><b>26</b><small>已读家庭</small></span><span><b>4</b><small>未读家庭</small></span><span><b>12</b><small>留言互动</small></span></div><p>系统保留内容版本、提交人、审核人、发布时间和阅读明细；撤回后家长端显示“内容已撤回”，不覆盖原审核记录。</p></section>`);
}

function campReportPreviewDrawer(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">OPS-006 · 营后报告</span><h2>张小满 · 个人成长报告</h2><span class="tag amber">待指导师确认</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="report-preview-hero"><span>X学院成长报告</span><h3>从参与到主动承担</h3><p>海洋领导力营 · 2026.07.12–07.17</p></section><section class="drawer-section report-radar-section"><h3>六维能力与往期对比</h3><p>同时展示本期营前、本期营后和上一期结营值，帮助判断本期变化以及跨营期延续情况。</p>${growthRadarPanel(2,false)}</section><section class="drawer-section"><h3>指导师评语与证据</h3><p>在团队路线选择发生分歧时，张小满主动组织同伴表达意见，并帮助小组形成可执行的分工方案。</p><div class="report-evidence-strip"><span>成长记录 8条</span><span>精选照片 12张</span><span>视频证据 2段</span><span>获得徽章 2枚</span></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline">下载PDF预览</button><button class="btn btn--primary" data-action="publish-camp-report">确认并推送家长</button></div></section>`);
}

function sessionNoticeEditor() {
  const s=campSessions[state.selectedSession]||campSessions[0];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">本期专属页面 · 开营通知</span><h2>${s.name}</h2><span class="tag amber">待发布</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="notice-editor-preview"><span>WELCOME TO X ACADEMY</span><h3>准备好，一起出发</h3><p>${s.course} · ${s.dates}</p></section><section class="drawer-section"><div class="form-grid"><div class="form-field full"><label>通知标题 *</label><input value="${s.name}开营通知"></div><div class="form-field full"><label>欢迎语</label><textarea>亲爱的家长和营员，欢迎加入本期${s.course}。请在出发前完成资料确认，并仔细阅读集合安排。</textarea></div><div class="form-field"><label>集合时间 *</label><input value="10月1日 08:30"></div><div class="form-field"><label>集合地点 *</label><input value="银川站南广场"></div><div class="form-field"><label>联系人</label><input value="${s.leader}老师"></div><div class="form-field"><label>联系电话</label><input value="138****6721"></div></div></section><section class="drawer-section"><div class="setting-row compact"><span><b>发布后发送站内信</b><small>触达已确认参营的父母账号</small></span><button class="toggle is-on"></button></div><div class="setting-row compact"><span><b>同步班级群公告</b><small>班级群创建后自动置顶</small></span><button class="toggle is-on"></button></div><div class="drawer-config-actions"><button class="btn btn--outline" data-action="preview-session-notice">预览家长端</button><button class="btn btn--primary" data-action="publish-session-notice">保存并发布</button></div></section>`);
}

function sessionNoticePreview(sessionIndex=state.selectedSession) {
  const s=campSessions[sessionIndex]||campSessions[0];
  openModal(`<div class="notice-phone-preview"><div class="notice-phone-bar"><button>‹</button><b>开营通知</b><button>•••</button></div><div class="notice-phone-hero"><span>X学院 · ${s.name}</span><h2>准备好，一起出发</h2><p>${s.course}</p></div><div class="notice-phone-body"><span class="tag green">已确认参营家庭可见</span><h3>亲爱的家长和营员</h3><p>欢迎加入本期${s.course}。请在出发前完成资料确认，并仔细阅读以下集合安排。</p><div class="notice-facts"><span><small>集合时间</small><b>10月1日 08:30</b></span><span><small>集合地点</small><b>银川站南广场</b></span><span><small>营期负责人</small><b>${s.leader}老师</b></span></div><button class="btn btn--primary wide" data-close-modal>我已阅读</button></div></div>`);
}

function lockSessionRosterModal() {
  const s=campSessions[state.selectedSession]||campSessions[0];
  openModal(`<span class="eyebrow">名单锁定 · ${s.id}</span><h2>锁定后将生成正式班组</h2><p class="modal-lead">系统将使用自动分组规则 V3 固化正式参营名单、班级与孩子指导师关系，并同步到营地执行端。</p><div class="check-list"><div class="check-row"><i>✓</i><span><b>已确认参营 29 人</b><small>只有正式确认的营员进入分组</small></span><em class="tag green">通过</em></div><div class="check-row"><i>✓</i><span><b>分组硬规则无冲突</b><small>3个班级，最大师生比1:5</small></span><em class="tag green">通过</em></div><div class="check-row error"><i>!</i><span><b>2人资料待补充</b><small>不阻断分组，但锁定后修改资料需留痕</small></span><em class="tag amber">提醒</em></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="confirm-lock-roster">确认锁定并生成分组</button></div>`);
}

function groupingSnapshotDrawer() {
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">正式分组快照</span><h2>规则 V3 · 2026-08-15 18:00</h2><span class="tag green">已固化</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>锁定依据</h3><div class="info-grid"><div class="info-item"><span>正式营员</span><b>29人</b></div><div class="info-item"><span>正式班组</span><b>3个</b></div><div class="info-item"><span>自动分配</span><b>27人</b></div><div class="info-item"><span>人工调整</span><b>2人</b></div></div></section><section class="drawer-section"><h3>规则快照</h3><div class="qualification-checks"><div><i>✓</i><span><b>每班目标10人，最多12人</b><small>最大师生比 1:5</small></span></div><div><i>✓</i><span><b>重点关注营员均衡</b><small>硬规则 · 无冲突</small></span></div><div><i>✓</i><span><b>年龄差与同行关系优先</b><small>2条人工调整已记录原因</small></span></div></div></section><section class="drawer-section course-rule-inherit-note"><i>i</i><div><b>历史分组不被后续规则覆盖</b><p>调整班级将生成新的审批单和分组版本，原V3快照永久保留。</p></div></section>`);
}

function manualGroupModal(rosterIndex=null) {
  const r=Number.isInteger(rosterIndex)?sessionRosterRows[rosterIndex]:sessionRosterRows[3];
  const current=r.group&&r.group!=="待分组"?r.group:"待分组";
  const groupMentors={"向日葵1班":"陈毅北","向日葵2班":"周岚","向日葵3班":"王森"};
  const targetGroups=Object.keys(groupMentors).filter(group=>group!==current);
  const defaultTarget=targetGroups[0];
  openModal(`<span class="eyebrow">名单锁定前 · 调班预览</span><h2>${r.name}调整班级</h2><p class="modal-lead">调班只修改当前分组预览；锁定名单时才固化正式班组，并同步教师、助教与任务范围。</p><div class="group-change-route"><span><small>当前班级</small><b>${current}</b><em>${r.mentor||'未分配指导师'}</em></span><i>→</i><span class="target"><small>目标班级</small><b id="targetGroupPreview">${defaultTarget}</b><em id="targetMentorPreview">${groupMentors[defaultTarget]} · 孩子指导师</em></span></div><div class="form-grid"><div class="form-field"><label>目标班级 *</label><select id="manualTargetGroup">${targetGroups.map(group=>`<option>${group}</option>`).join('')}</select></div><div class="form-field"><label>调整类型</label><select><option>运营手动优化</option><option>同行关系调整</option><option>重点关注均衡</option><option>师生比调整</option></select></div><div class="form-field full"><label>调整说明</label><textarea id="manualGroupReason" placeholder="填写本次调整依据，锁定时写入分组快照">优化年龄结构，并保持重点关注营员均衡</textarea></div></div><div class="group-change-checks"><div><i>✓</i><span><b>目标班容量</b><small>调整后 11 / 12人</small></span><em class="tag green">通过</em></div><div><i>✓</i><span><b>综合师生比</b><small>教师与助教调整后 1 : 4.8</small></span><em class="tag green">通过</em></div><div><i>✓</i><span><b>重点关注均衡</b><small>目标班调整后仍为1名重点关注营员</small></span><em class="tag green">通过</em></div><div><i>!</i><span><b>任务与沟通范围</b><small>锁定名单时同步目标班教师、助教及班级群</small></span><em class="tag purple">将更新</em></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="confirm-manual-group" data-roster-index="${sessionRosterRows.indexOf(r)}">应用到分组预览</button></div>`);
}

function regroupRequestModal(rosterIndex=null) {
  const r=Number.isInteger(rosterIndex)?sessionRosterRows[rosterIndex]:sessionRosterRows[2];
  const groupMentors={"向日葵1班":"陈毅北","向日葵2班":"周岚","向日葵3班":"王森"};
  const targetGroups=Object.keys(groupMentors).filter(group=>group!==r.group);
  const defaultTarget=targetGroups[0];
  openModal(`<span class="eyebrow">名单锁定后 · 调班审批</span><h2>${r.name}申请调整正式班级</h2><p class="modal-lead">正式班组已固化，不能直接覆盖。系统先校验目标班容量、师生比、风险与执行影响，审批通过后生成新分组版本。</p><div class="group-change-route"><span><small>当前正式班级</small><b>${r.group}</b><em>${r.mentor}</em></span><i>→</i><span class="target"><small>申请目标班级</small><b id="targetGroupPreview">${defaultTarget}</b><em id="targetMentorPreview">${groupMentors[defaultTarget]} · 孩子指导师</em></span></div><div class="form-grid"><div class="form-field"><label>目标班级 *</label><select id="regroupTargetGroup">${targetGroups.map(group=>`<option>${group}</option>`).join('')}</select></div><div class="form-field"><label>紧急程度</label><select><option>普通 · 审批后生效</option><option>紧急 · 营期负责人优先处理</option></select></div><div class="form-field full"><label>调整原因 *</label><textarea id="regroupReason" placeholder="请说明安全、同行关系或执行安排原因">同行关系与现场执行安排需要调整</textarea></div></div><div class="group-change-checks"><div><i>✓</i><span><b>目标班容量</b><small>调整后 11 / 12人</small></span><em class="tag green">通过</em></div><div><i>✓</i><span><b>师生比与助教配置</b><small>调整后 1 : 4.8，满足上限</small></span><em class="tag green">通过</em></div><div><i>!</i><span><b>下游影响</b><small>将更新班级群、指导师/助教名单和未完成任务</small></span><em class="tag amber">需审批</em></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="submit-regroup-request">提交调班审批</button></div>`);
}

function rosterPersonDrawer() {
  const r=sessionRosterRows[0];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">营期报名档案</span><h2>${r.name}</h2><span class="tag green">${r.status}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>报名与资格</h3><div class="info-grid"><div class="info-item"><span>student_id</span><b>ST109382</b></div><div class="info-item"><span>监护人</span><b>${r.guardian}</b></div><div class="info-item"><span>服务资格</span><b>${r.qualification}</b></div><div class="info-item"><span>资料</span><b>${r.material}</b></div></div></section><section class="drawer-section"><h3>正式分组</h3><p>${r.group} · 孩子指导师 ${r.mentor}。名单锁定后如需调整，必须提交换班申请。</p></section><section class="drawer-section"><h3>健康与安全</h3><p>当前无阻断项。敏感健康信息仅向本期必要岗位开放，查看行为自动写入审计日志。</p></section>`);
}

function campTaskEditor(isNew=false) {
  openModal(`<span class="eyebrow">营程任务 · ${isNew?'新增':'编辑'}</span><h2>${isNew?'添加每日任务':'到营签到与健康复核'}</h2><div class="form-grid"><div class="form-field"><label>任务来源 *</label><select><option>日程任务</option><option>业务节点</option><option>风险提醒</option><option>人工任务</option></select></div><div class="form-field"><label>执行日期 *</label><select><option>第1天 · 08月03日</option><option>第2天 · 08月04日</option></select></div><div class="form-field"><label>开始时间 *</label><input type="time" value="08:30"></div><div class="form-field"><label>执行地点</label><input value="集合大厅"></div><div class="form-field full"><label>任务名称 *</label><input value="${isNew?'':'到营签到与健康复核'}" placeholder="填写任务名称"></div><div class="form-field"><label>责任岗位 *</label><select><option>孩子指导师</option><option>营期负责人</option><option>课程导师</option><option>医疗老师</option></select></div><div class="form-field"><label>完成条件 *</label><select><option>班级全员签到</option><option>上传记录</option><option>负责人手动完成</option><option>系统状态自动完成</option></select></div><div class="form-field"><label>提前提醒</label><select><option>提前30分钟</option><option>提前1小时</option></select></div><div class="form-field"><label>超时升级</label><select><option>通知营期负责人</option><option>通知营长</option></select></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="save-camp-task">保存任务</button></div>`);
}

function checkinReviewModal(name) {
  state.pendingCheckinName=name;
  openModal(`<span class="eyebrow">到营签到 · 身份与健康复核</span><h2>${name}</h2><p class="modal-lead">签到前确认营员属于当前锁定名单，参营状态有效，并完成现场健康复核。</p><div class="check-list"><div class="check-row"><i>✓</i><span><b>锁定名单匹配</b><small>新疆自然探索营 · 向日葵2班</small></span><em class="tag green">通过</em></div><div class="check-row"><i>✓</i><span><b>参营状态有效</b><small>已确认参营 · 服务资格冻结1次</small></span><em class="tag green">通过</em></div><div class="check-row ${name==='林知夏'?'error':''}"><i>${name==='林知夏'?'!':'✓'}</i><span><b>现场健康复核</b><small>${name==='林知夏'?'坚果过敏，请确认应急药物和用餐标识':'精神状态、体温及随身药品已确认'}</small></span><em class="tag ${name==='林知夏'?'amber':'green'}">${name==='林知夏'?'需确认':'通过'}</em></div></div>${name==='林知夏'?`<label class="health-confirm"><input id="healthConfirm" type="checkbox"><span>已与监护人/医疗老师复核过敏事项，可以签到</span></label>`:''}<div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="confirm-person-checkin">确认签到</button></div>`);
}

function batchCheckinModal() {
  openModal(`<span class="eyebrow">批量签到</span><h2>选择已现场确认的营员</h2><p class="modal-lead">批量操作仍逐人校验名单、参营状态和健康阻断项；存在风险的营员不会被批量签到。</p><div class="batch-checkin-list">${['张小满','林知夏','王予安'].map((name,index)=>`<label><input type="checkbox" ${index===1?'disabled':'checked'}><span><b>${name}</b><small>${index===1?'健康复核待确认，需单独处理':'名单及资料校验通过'}</small></span><em class="tag ${index===1?'amber':'green'}">${index===1?'已阻断':'可签到'}</em></label>`).join('')}</div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="confirm-batch-checkin">确认签到2人</button></div>`);
}

function missingArrivalModal() {
  openModal(`<span class="eyebrow">未到营异常</span><h2>登记未按时到营</h2><p class="modal-lead">登记后通知营期负责人，并根据原因决定继续等待、联系监护人或转交通异常处理。</p><div class="form-grid"><div class="form-field"><label>营员 *</label><select><option>林知夏</option><option>王予安</option></select></div><div class="form-field"><label>异常类型 *</label><select><option>交通延误</option><option>无法联系</option><option>临时身体不适</option></select></div><div class="form-field full"><label>现场说明</label><textarea placeholder="填写已联系人员、预计到达时间和当前处理"></textarea></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--danger" data-action="submit-missing-arrival">提交异常</button></div>`);
}

function approvalListPage() {
  const f=state.approvalFilters;
  const rows=state.approvals.filter(a=>{
    const text=`${a.id}${a.type}${a.name}${a.detail}${a.risk}`;
    return (!f.keyword||text.includes(f.keyword))
      && (f.type==='全部类型'||a.type===f.type)
      && (f.course==='全部课程'||a.detail.includes(f.course));
  });
  const typeOptions=['全部类型','取消申请','改期申请','更换营员','合同异常'];
  const courseOptions=['全部课程','沙漠','东北','新疆'];
  return `<section class="list-flow-page"><div class="list-flow-intro"><div><span class="eyebrow">例外业务统一处理</span><h2>审批中心</h2><p>取消、改期、更换营员与合同异常均进入列表流，审批决定同步预约状态、服务资格流水与操作审计。</p></div><div class="list-flow-summary"><span><b>${state.approvals.length}</b><small>待处理</small></span><span><b>1.6h</b><small>平均等待</small></span><span><b>2</b><small>临近超时</small></span></div></div><section class="table-card list-flow-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="approvalKeyword" class="input" value="${f.keyword}" placeholder="申请编号 / 营员 / 父母账号"></label><label class="filter-field"><span>申请类型</span><select id="approvalType" class="select">${typeOptions.map(x=>`<option ${x===f.type?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>关联课程</span><select id="approvalCourse" class="select">${courseOptions.map(x=>`<option ${x===f.course?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>提交时间</span><select class="select"><option>近30天</option><option>近7天</option><option>今天</option></select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-approval-filters">重置</button><button class="btn btn--primary" data-action="apply-approval-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 条结果 · 已选择 0 条</span><div><button class="btn btn--outline compact">导出</button><button class="btn btn--outline compact">批量转交</button></div></div><div class="table-scroll"><table class="data-table list-flow-table"><thead><tr><th><input type="checkbox" aria-label="全选"></th><th>申请编号</th><th>申请类型</th><th>申请对象</th><th>关联课程 / 营期</th><th>变更影响</th><th>提交时间</th><th>时效</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map((a,index)=>`<tr><td><input type="checkbox" aria-label="选择${a.id}"></td><td><b>${a.id}</b><small>父母端提交</small></td><td><span class="tag ${a.type==='合同异常'?'red':a.type==='取消申请'?'amber':'purple'}">${a.type}</span></td><td><div class="cell-person"><span class="mini-avatar">${a.name.slice(0,1)}</span><span><b>${a.name}</b><small>${index%2?'139****0911':'138****3821'}</small></span></div></td><td>${a.detail.split('·')[0]}<small>${index===0?'沙漠星空探索营 · 国庆03期':index===1?'东北雪境探索营 · 寒假08期':'X学院预约'}</small></td><td>${a.risk}</td><td>2026-08-17<small>${['10:42','09:18','08:36','昨天 17:20'][index]||'08:00'}</small></td><td><span class="sla-chip ${index<2?'urgent':''}">${index<2?'剩余 '+(index+1)+'小时':'正常'}</span></td><td><div class="row-actions"><button data-view-approval="${a.id}">详情</button><button class="primary" data-approve="${a.id}">审批</button></div></td></tr>`).join(''):`<tr><td colspan="9"><div class="list-empty">没有符合当前筛选条件的审批单</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button disabled>›</button></div></div></section></section>`;
}

function qualificationListPage() {
  const f=state.qualificationFilters;
  const rows=qualificationRows.filter(q=>{
    const available=q.total-q.used-q.frozen;
    const balanceMatch=f.balance==='全部次数'||(f.balance==='有可用次数'&&available>0)||(f.balance==='已用完'&&available===0)||(f.balance==='有冻结'&&q.frozen>0);
    return (!f.keyword||`${q.id}${q.parent}${q.phone}${q.order}${q.children}`.includes(f.keyword))
      && (f.status==='全部状态'||q.status===f.status)
      && (f.package==='全部课包'||q.package===f.package)
      && balanceMatch;
  });
  const statusOptions=['全部状态','有效','即将到期','已用完','已失效'];
  const packageOptions=['全部课包','自然探索成长课包','领导力成长课包'];
  const balanceOptions=['全部次数','有可用次数','有冻结','已用完'];
  return `<section class="list-flow-page"><div class="list-flow-intro"><div><span class="eyebrow">父母账号维度</span><h2>X学院服务资格</h2><p>资格由SCRM已生效订单开通；合同孩子作为候选服务对象，关联子产品限定可预约课程范围。</p></div><div class="list-flow-summary qualification"><span><b>286</b><small>有效资格</small></span><span><b>912</b><small>可用次数</small></span><span><b>48</b><small>预约冻结</small></span><span><b>12</b><small>即将到期</small></span></div></div><section class="table-card list-flow-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="qualificationKeyword" class="input" value="${f.keyword}" placeholder="资格编号 / 父母账号 / 手机 / 订单"></label><label class="filter-field"><span>资格状态</span><select id="qualificationStatus" class="select">${statusOptions.map(x=>`<option ${x===f.status?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>来源课包</span><select id="qualificationPackage" class="select">${packageOptions.map(x=>`<option ${x===f.package?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>次数状态</span><select id="qualificationBalance" class="select">${balanceOptions.map(x=>`<option ${x===f.balance?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-qualification-filters">重置</button><button class="btn btn--primary" data-action="apply-qualification-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 条结果 · 已选择 0 条</span><div><button class="btn btn--outline compact">导出当前结果</button><button class="btn btn--outline compact">批量延长有效期</button></div></div><div class="table-scroll"><table class="data-table list-flow-table qualification-list-table"><thead><tr><th><input type="checkbox" aria-label="全选"></th><th>资格编号</th><th>父母账号</th><th>来源订单 / 课包</th><th>可用课程范围</th><th>合同孩子</th><th>次数</th><th>有效期</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(q=>{const available=q.total-q.used-q.frozen;return `<tr><td><input type="checkbox" aria-label="选择${q.id}"></td><td><b>${q.id}</b><small>系统自动开通</small></td><td>${q.parent}<small>${q.phone}</small></td><td><button class="table-link">${q.order}</button><small>${q.package}</small></td><td>${q.courses}</td><td>${q.children}</td><td><div class="balance-cell"><b>${available}</b><span>/ ${q.total}次</span>${q.frozen?`<small>冻结 ${q.frozen} 次</small>`:''}</div></td><td>${q.expiry}</td><td><span class="tag ${q.status==='有效'?'green':q.status==='即将到期'?'amber':q.status==='已失效'?'red':''}">${q.status}</span></td><td><div class="row-actions"><button data-action="view-qualification">详情</button><button>流水</button></div></td></tr>`}).join(''):`<tr><td colspan="10"><div class="list-empty">没有符合当前筛选条件的服务资格</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button>2</button><button>›</button></div></div></section></section>`;
}

function childUserListPageLegacy() {
  const f=state.childUserFilters;
  const rows=childUserRows.filter(user=>{
    const guardianText=user.guardians.map(g=>`${g.name}${g.phone}${g.relation}`).join("");
    return (!f.keyword||`${user.studentId}${user.name}${guardianText}`.includes(f.keyword))
      && (f.relation==='全部关系状态'||user.relation===f.relation)
      && (f.qualification==='全部资格状态'||user.qualification===f.qualification)
      && (f.journey==='全部参与状态'||user.journey===f.journey);
  });
  const relationOptions=['全部关系状态','关系完整','仅一个监护人','关系待确认'];
  const qualificationOptions=['全部资格状态','有效','已用完','已失效'];
  const journeyOptions=['全部参与状态','未预约','待出发','变更处理中','已结营'];
  return `<section class="child-user-page list-flow-page"><div class="list-flow-intro child-user-intro"><div><span class="eyebrow">以孩子 student_id 为成长主档</span><h2>营员与家庭</h2><p>一行代表一个孩子主档；父母及其他监护人作为关联账号展示。父母账号持有服务资格，孩子主档承载预约、履约和长期成长记录。</p></div><div class="list-flow-summary child-user-summary"><span><b>428</b><small>孩子主档</small></span><span><b>694</b><small>关联监护人</small></span><span><b>18</b><small>关系待确认</small></span><span><b>286</b><small>有效资格家庭</small></span></div></div><section class="child-user-rule-strip"><span><i>孩</i><b>孩子主档</b><small>student_id · 预约 · 营期 · 成长档案</small></span><em>关联</em><span><i>家</i><b>父母/监护人账号</b><small>登录账号 · 联系方式 · 服务资格</small></span></section><section class="table-card list-flow-card child-user-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="childUserKeyword" class="input" value="${f.keyword}" placeholder="孩子姓名 / student_id / 家长姓名 / 手机号"></label><label class="filter-field"><span>家庭关系</span><select id="childUserRelation" class="select">${relationOptions.map(x=>`<option ${x===f.relation?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>关联资格</span><select id="childUserQualification" class="select">${qualificationOptions.map(x=>`<option ${x===f.qualification?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>参与状态</span><select id="childUserJourney" class="select">${journeyOptions.map(x=>`<option ${x===f.journey?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-child-user-filters">重置</button><button class="btn btn--primary" data-action="apply-child-user-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 个孩子 · 关联 <b>${rows.reduce((sum,user)=>sum+user.guardians.length,0)}</b> 个监护人账号</span><div><button class="btn btn--outline compact">导出孩子与监护人关系</button><button class="btn btn--outline compact">批量检查关系异常</button></div></div><div class="table-scroll"><table class="data-table child-user-table"><thead><tr><th><input type="checkbox" aria-label="全选"></th><th>孩子主档</th><th>父母 / 监护人账号</th><th>关系状态</th><th>关联服务资格</th><th>当前参与状态</th><th>成长沉淀</th><th>最后更新</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(user=>`<tr><td><input type="checkbox" aria-label="选择${user.name}"></td><td><div class="cell-person child-master-cell"><span class="mini-avatar">${user.name[0]}</span><span><b>${user.name}</b><small>${user.gender} · ${user.age}岁 · ${user.studentId}</small><em class="identity-state ${user.identity==='待确认'?'warning':''}">${user.identity}</em></span></div></td><td><div class="guardian-account-stack">${user.guardians.map(g=>`<span><i>${g.relation.slice(0,1)}</i><span><b>${g.name}<em>${g.role}</em></b><small>${g.phone} · ${g.relation}</small></span></span>`).join('')}</div></td><td><span class="tag ${user.relation==='关系完整'?'green':user.relation==='关系待确认'?'red':'amber'}">${user.relation}</span><small>${user.guardians.length} 个关联账号</small></td><td><span class="tag ${user.qualification==='有效'?'green':user.qualification==='已失效'?'red':'amber'}">${user.qualification}</span><small>资格归属主父母账号</small></td><td><b>${user.journey}</b><small>${user.current}</small></td><td><b>${user.growth}</b><small>已完成 ${user.completed} 个营期</small></td><td>${user.updated}<small>2026-08-17</small></td><td><div class="row-actions"><button data-child-user="${user.studentId}">详情</button><button data-action="view-child-growth" data-child-user="${user.studentId}">成长档案</button></div></td></tr>`).join(''):`<tr><td colspan="9"><div class="list-empty">没有符合当前筛选条件的孩子与家庭关系</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 个孩子</span><div><button disabled>‹</button><button class="active">1</button><button>2</button><button>›</button></div></div></section><section class="child-user-boundary-note"><i>i</i><div><b>父母资格和孩子成长档案不能合并成同一个对象</b><p>服务资格属于父母登录账号，可供合同约定的候选孩子预约；参营记录和六维成长数据永久归属实际参营孩子的 student_id。更换营员时不迁移历史。</p></div></section></section>`;
}

function openChildUserDrawerLegacy(studentId) {
  const user=childUserRows.find(item=>item.studentId===studentId)||childUserRows[0];
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">孩子用户主档 · ${user.studentId}</span><h2>${user.name}</h2><span class="tag ${user.identity==='已实名'?'green':'amber'}">${user.identity}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><div class="child-profile-summary"><span class="child-profile-avatar">${user.name[0]}</span><div><small>孩子基础信息</small><b>${user.name} · ${user.gender} · ${user.age}岁</b><p>出生日期 ${user.birthday} · student_id 为预约、履约与成长档案唯一主键</p></div></div></section><section class="drawer-section"><div class="rule-section-title"><span>01</span><div><h3>父母与监护人账号</h3><p>支持同一孩子关联多个监护人，必须明确主联系账号</p></div></div><div class="guardian-detail-list">${user.guardians.map(g=>`<article><i>${g.relation.slice(0,1)}</i><span><b>${g.name}<em>${g.role}</em></b><small>${g.phone} · ${g.relation}</small><p>${g.qualification}</p></span><button data-action="view-parent-account">查看账号</button></article>`).join('')}</div>${user.relation!=='关系完整'?`<div class="guardian-relation-warning"><i>!</i><span><b>${user.relation}</b><small>补充或核验关系后，才能向新增监护人开放孩子资料和营期消息。</small></span><button data-action="verify-guardian-relation">处理关系</button></div>`:''}</section><section class="drawer-section"><div class="rule-section-title"><span>02</span><div><h3>服务资格与预约边界</h3><p>资格属于父母账号，孩子只在预约具体营期时成为参营对象</p></div></div><div class="child-user-resource-grid"><article><small>关联资格</small><b>${user.qualification}</b><em>${user.guardians[0].qualification}</em></article><article><small>当前状态</small><b>${user.journey}</b><em>${user.current}</em></article><article><small>已完成营期</small><b>${user.completed} 期</b><em>历史不随关系变更迁移</em></article><article><small>成长档案</small><b>${user.growth}</b><em>归属 ${user.studentId}</em></article></div></section><section class="drawer-section"><div class="rule-section-title"><span>03</span><div><h3>最近业务记录</h3><p>从父母资格到孩子履约的关键关系留痕</p></div></div><div class="timeline child-user-timeline"><div class="timeline-item current"><span class="timeline-dot"></span><span><b>${user.current}</b><small>${user.journey} · 最近更新 ${user.updated}</small></span><time>08-17</time></div><div class="timeline-item"><span class="timeline-dot"></span><span><b>监护人关系已同步</b><small>${user.guardians.map(g=>`${g.name}（${g.relation}）`).join('、')}</small></span><time>08-16</time></div><div class="timeline-item"><span class="timeline-dot"></span><span><b>孩子主档建立</b><small>身份匹配后生成 ${user.studentId}</small></span><time>历史</time></div></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-action="view-child-audit">查看关系审计</button><button class="btn btn--primary" data-action="view-child-growth">查看成长档案</button></div></section>`);
}

function childUserListPage() {
  const f=state.childUserFilters;
  const rows=childUserRows.filter(user=>{
    const guardianText=user.guardians.map(g=>`${g.name}${g.phone}${g.relation}`).join("");
    return (!f.keyword||`${user.studentId}${user.name}${guardianText}`.includes(f.keyword))
      && (f.relation==='全部关系状态'||user.relation===f.relation)
      && (f.qualification==='全部资格状态'||user.qualification===f.qualification)
      && (f.journey==='全部参与状态'||user.journey===f.journey);
  });
  const relationOptions=['全部关系状态','关系完整','仅一个监护人','关系待确认'];
  const qualificationOptions=['全部资格状态','有效','已用完','已失效'];
  const journeyOptions=['全部参与状态','未预约','待出发','变更处理中','已结营'];
  const rowHtml=user=>{
    const mainGuardian=user.guardians.find(g=>g.role==='主账号')||user.guardians[0];
    const growthReady=user.completed>0;
    return `<article class="child-directory-row ${user.relation==='关系待确认'?'has-warning':''}">
      <div class="child-directory-person"><span class="child-directory-avatar">${user.name[0]}<i class="${user.identity==='已实名'?'ok':'warn'}"></i></span><span><b>${user.name}</b><small>${user.gender} · ${user.age}岁</small><em>${user.studentId}</em></span></div>
      <div class="child-directory-family"><div class="family-member-pills">${user.guardians.map(g=>`<span class="${g.role==='主账号'?'primary':''}"><i>${g.relation.slice(0,1)}</i><b>${g.name}</b><small>${g.phone}</small><em>${g.role}</em></span>`).join('')}</div><small class="relation-foot ${user.relation==='关系待确认'?'warn':''}">${user.relation} · ${user.guardians.length} 个监护人账号</small></div>
      <div class="child-directory-service"><span class="directory-status ${user.qualification==='有效'?'ok':user.qualification==='已失效'?'danger':'warn'}">${user.qualification}</span><b>${mainGuardian?.name||'待确认'}</b><small>资格持有人</small></div>
      <div class="child-directory-growth"><span><b>${user.completed}</b><small>已完成营期</small></span><i><em style="--growth:${Math.min(user.completed/4*100,100)}%"></em></i><button data-action="view-child-growth" data-child-user="${user.studentId}">${growthReady?user.growth:'尚未建立'} <strong>›</strong></button></div>
      <div class="child-directory-journey"><span class="journey-dot ${user.journey==='变更处理中'?'warn':user.journey==='已结营'?'done':''}"></span><span><b>${user.journey}</b><small>${user.current}</small><em>更新于 ${user.updated}</em></span></div>
      <div class="child-directory-actions"><button class="quiet" data-action="view-child-growth" data-child-user="${user.studentId}">成长档案</button><button class="primary" data-child-user="${user.studentId}">查看主档</button></div>
    </article>`;
  };
  return `<section class="child-directory-page">
    <section class="child-directory-hero"><div class="child-directory-title"><span class="directory-mark">人</span><div><span class="eyebrow">X学院 · 孩子用户主档</span><h2>营员与家庭</h2><p>以孩子 student_id 组织预约、履约和成长数据，同时清楚呈现父母及其他监护人的账号关系。</p></div></div><div class="child-directory-metrics"><span><b>428</b><small>孩子主档</small></span><span><b>694</b><small>监护人账号</small></span><span class="warning"><b>18</b><small>关系待确认</small></span><span class="accent"><b>286</b><small>有效资格家庭</small></span></div></section>
    <section class="child-directory-toolbar"><div class="directory-view-tabs"><button class="active"><i>孩</i>孩子视图</button><button><i>家</i>家庭视图</button></div><div class="directory-filter-grid"><label class="directory-search"><span>⌕</span><input id="childUserKeyword" value="${f.keyword}" placeholder="搜索孩子、student_id、家长或手机号"></label><select id="childUserRelation">${relationOptions.map(x=>`<option ${x===f.relation?'selected':''}>${x}</option>`).join('')}</select><select id="childUserQualification">${qualificationOptions.map(x=>`<option ${x===f.qualification?'selected':''}>${x}</option>`).join('')}</select><select id="childUserJourney">${journeyOptions.map(x=>`<option ${x===f.journey?'selected':''}>${x}</option>`).join('')}</select><button class="filter-reset" data-action="reset-child-user-filters">重置</button><button class="filter-submit" data-action="apply-child-user-filters">查询</button></div></section>
    <section class="child-directory-list"><header><span>孩子主档</span><span>父母 / 监护人</span><span>服务资格</span><span>成长档案</span><span>当前状态</span><span>操作</span></header>${rows.length?rows.map(rowHtml).join(''):`<div class="child-directory-empty"><i>⌕</i><b>没有找到符合条件的孩子</b><small>请调整姓名、家庭关系、资格或参与状态筛选</small><button data-action="reset-child-user-filters">清除筛选</button></div>`}<footer><span>当前显示 <b>${rows.length}</b> 个孩子 · 关联 <b>${rows.reduce((sum,user)=>sum+user.guardians.length,0)}</b> 个监护人账号</span><div><button disabled>‹</button><button class="active">1</button><button>2</button><button>›</button></div></footer></section>
    <section class="child-directory-boundary"><i>i</i><span><b>后台可查看孩子成长档案，但数据归属仍保持清晰</b><small>服务资格属于父母账号；预约、营期记录、六维测评和成长报告永久归属实际参营孩子的 student_id。后台查看行为写入审计日志。</small></span><button data-action="view-child-audit">查看权限与审计</button></section>
  </section>`;
}

function childUserGrowthIndex(user) {
  return Math.min(Math.max((user.completed||1)-1,0),growthSessionHistory.length-1);
}

function childUserDetailContent(user,tab) {
  const mainGuardian=user.guardians.find(g=>g.role==='主账号')||user.guardians[0];
  if(tab==='family') return `<section class="child-profile-section"><div class="profile-section-title"><span>家庭关系</span><h3>父母与监护人账号</h3><p>同一孩子可以关联多个监护人，但必须明确主联系账号和资料查看权限。</p></div><div class="profile-guardian-grid">${user.guardians.map(g=>`<article class="${g.role==='主账号'?'primary':''}"><header><i>${g.relation.slice(0,1)}</i><span><b>${g.name}</b><small>${g.phone} · ${g.relation}</small></span><em>${g.role}</em></header><div><span><small>服务资格</small><b>${g.qualification}</b></span><span><small>消息权限</small><b>${g.role==='待确认账号'?'未开放':'营期通知与成长报告'}</b></span></div><footer><button data-action="view-parent-account">查看父母账号</button><button>关系记录</button></footer></article>`).join('')}</div>${user.relation!=='关系完整'?`<div class="profile-action-warning"><i>!</i><span><b>${user.relation}</b><small>完成监护关系核验前，不向新增账号开放孩子健康资料和成长报告。</small></span><button data-action="verify-guardian-relation">立即处理</button></div>`:''}</section>`;
  if(tab==='journey') return `<section class="child-profile-section"><div class="profile-section-title"><span>课程履约</span><h3>预约与营期时间线</h3><p>从资格选择孩子开始，持续保留预约、变更、签到、结营与报告推送记录。</p></div><div class="profile-journey-summary"><span><b>${user.completed}</b><small>已完成营期</small></span><span><b>${user.journey}</b><small>当前参与状态</small></span><span><b>${user.qualification}</b><small>关联资格状态</small></span></div><div class="profile-journey-list"><article class="active"><time>当前</time><i></i><span><b>${user.current}</b><small>${user.journey} · 最近更新 ${user.updated}</small></span><button>查看业务详情</button></article>${user.completed?`<article><time>最近结营</time><i></i><span><b>${growthSessionHistory[childUserGrowthIndex(user)].name}</b><small>已完成签到、权益核销与成长报告归档</small></span><button data-action="view-child-growth" data-child-user="${user.studentId}">查看报告</button></article>`:''}<article><time>主档建立</time><i></i><span><b>${user.studentId}</b><small>合同孩子身份匹配后生成，历史数据不覆盖</small></span><button data-action="view-child-audit">审计记录</button></article></div></section>`;
  if(tab==='growth') {
    if(!user.completed) return `<section class="child-profile-section"><div class="profile-section-title"><span>成长档案</span><h3>尚未形成正式成长记录</h3><p>孩子完成首个营期并发布营后报告后，六维变化、指导师评语和成长证据将沉淀在这里。</p></div><div class="backend-growth-empty"><i>◇</i><b>等待第一次真实经历</b><small>当前可先查看预约与行前准备情况</small><button data-child-user-tab="journey">查看课程履约</button></div></section>`;
    const index=childUserGrowthIndex(user);
    const reports=growthSessionHistory.slice(0,Math.min(user.completed,growthSessionHistory.length)).reverse();
    return `<section class="child-profile-section backend-growth-archive"><div class="profile-section-title with-action"><div><span>后台成长档案</span><h3>${user.name}的跨营期成长轨迹</h3><p>后台人员可按权限查看六维变化、报告和证据；每次查看都会记录审计日志。</p></div><button class="audit-view-chip">已记录本次查看</button></div>${growthRadarPanel(index,false)}<div class="backend-growth-library"><div class="library-title"><span><b>历次成长报告</b><small>${reports.length} 期正式记录</small></span><button>导出档案摘要</button></div>${reports.map((report,reportIndex)=>`<article><span class="report-season">${report.short.slice(0,1)}</span><span><b>${report.name}</b><small>${report.period} · 六维测评、指导师评语、成长证据</small></span><em>已归档</em><button data-backend-growth-report="${reportIndex}">查看完整报告</button></article>`).join('')}</div></section>`;
  }
  return `<section class="child-profile-section"><div class="profile-overview-grid"><article class="profile-identity-card"><span class="large-child-avatar">${user.name[0]}</span><div><small>孩子身份主档</small><h3>${user.name}</h3><p>${user.gender} · ${user.age}岁 · 出生日期 ${user.birthday}</p><em>${user.studentId} · ${user.identity}</em></div></article><article class="profile-primary-contact"><small>主联系账号</small><b>${mainGuardian?.name||'待确认'}</b><p>${mainGuardian?.phone||'—'} · ${mainGuardian?.relation||'关系待确认'}</p><span>${mainGuardian?.qualification||'暂无有效资格'}</span></article></div><div class="profile-overview-stats"><article><i>营</i><span><small>课程履约</small><b>${user.journey}</b><em>${user.current}</em></span></article><article><i>长</i><span><small>成长沉淀</small><b>${user.growth}</b><em>已完成 ${user.completed} 个营期</em></span></article><article><i>家</i><span><small>家庭关系</small><b>${user.relation}</b><em>${user.guardians.length} 个监护人账号</em></span></article></div><div class="profile-overview-panels"><article><header><span><b>家庭成员</b><small>父母与监护人账号</small></span><button data-child-user-tab="family">管理关系 ›</button></header><div class="overview-family-list">${user.guardians.map(g=>`<span><i>${g.relation.slice(0,1)}</i><span><b>${g.name}</b><small>${g.phone} · ${g.role}</small></span></span>`).join('')}</div></article><article><header><span><b>最近成长</b><small>按 student_id 长期累积</small></span><button data-child-user-tab="growth">打开档案 ›</button></header>${user.completed?`<div class="overview-growth-preview"><div><strong>${Math.round(growthSessionHistory[childUserGrowthIndex(user)].post.reduce((a,b)=>a+b,0)/6)}</strong><small>最近一期综合值</small></div><span><b>${growthSessionHistory[childUserGrowthIndex(user)].name}</b><small>${growthSessionHistory[childUserGrowthIndex(user)].story}</small></span></div>`:`<div class="overview-growth-empty">尚未完成营期，暂无正式成长报告</div>`}</article></div></section>`;
}

function openChildUserDrawer(studentId,tab="overview") {
  const user=childUserRows.find(item=>item.studentId===studentId)||childUserRows[0];
  state.selectedChildUserId=user.studentId;
  state.childUserDetailTab=tab;
  openDrawer(`<section class="child-profile-drawer"><header class="child-profile-hero"><div class="profile-hero-identity"><span>${user.name[0]}<i class="${user.identity==='已实名'?'ok':'warn'}"></i></span><div><small>孩子用户主档</small><h2>${user.name}</h2><p>${user.studentId} · ${user.gender} · ${user.age}岁</p></div></div><div class="profile-hero-state"><span><small>当前状态</small><b>${user.journey}</b></span><span><small>服务资格</small><b>${user.qualification}</b></span></div><button class="drawer__close profile-close" data-close-drawer>×</button></header><nav class="child-profile-tabs"><button class="${tab==='overview'?'active':''}" data-child-user-tab="overview">总览</button><button class="${tab==='family'?'active':''}" data-child-user-tab="family">家庭关系 <em>${user.guardians.length}</em></button><button class="${tab==='journey'?'active':''}" data-child-user-tab="journey">课程履约</button><button class="${tab==='growth'?'active':''}" data-child-user-tab="growth">成长档案 <em>${user.completed}</em></button></nav><main class="child-profile-content">${childUserDetailContent(user,tab)}</main></section>`);
}

const xOrderRows = [
  {id:"D260817-00231",contract:"HT260817-00112",parent:"林女士",phone:"138****3821",package:"自然探索成长课包",benefits:"5次 · 12个月",subproducts:"东北雄鹰、沙漠星空",children:"张小满、张小安",validation:"全部通过",sync:"待开通",updated:"08-17 15:20",stage:"ready",detail:"订单已结清 · 合同已归档 · 父母账号已匹配 · 合同孩子已匹配"},
  {id:"D260817-00225",contract:"HT260817-00108",parent:"赵女士",phone:"139****0911",package:"自然探索成长课包",benefits:"5次 · 12个月",subproducts:"云南雨林",children:"赵一诺",validation:"证件重复",sync:"人工处理",updated:"08-17 14:08",stage:"blocked",detail:"合同孩子证件与历史 student_id 重复，需要人工确认归属"},
  {id:"D260816-00198",contract:"HT260816-00092",parent:"周先生",phone:"136****1028",package:"领导力成长课包",benefits:"3次 · 12个月",subproducts:"海洋领导力",children:"周可乐",validation:"待匹配",sync:"待处理",updated:"08-17 13:42",stage:"pending",detail:"合同已归档，父母手机号已存在，但账号匹配待确认"},
  {id:"D260815-00176",contract:"HT260815-00071",parent:"陈女士",phone:"137****6620",package:"自然探索成长课包",benefits:"5次 · 12个月",subproducts:"东北雪境、敦煌人文",children:"陈星野",validation:"合同缺失",sync:"待补条件",updated:"08-17 11:26",stage:"blocked",detail:"订单已结清，但电子合同尚未归档，暂不允许开通"},
  {id:"D260814-00152",contract:"HT260814-00063",parent:"王先生",phone:"135****4417",package:"领导力成长课包",benefits:"3次 · 6个月",subproducts:"海洋领导力",children:"王予安",validation:"全部通过",sync:"已开通",updated:"08-17 10:12",stage:"done",detail:"已生成资格 XQ-202608-0268，开通结果已同步"},
  {id:"D260813-00119",contract:"HT260813-00044",parent:"刘女士",phone:"133****2096",package:"自然探索成长课包",benefits:"2次 · 6个月",subproducts:"云南雨林",children:"刘知夏",validation:"订单未结清",sync:"暂缓",updated:"08-17 09:36",stage:"blocked",detail:"仍有 ¥6,800 未收款，不满足开通前置条件"}
];

function getFilteredXOrderRows() {
  const f=state.xOrderFilters;
  return xOrderRows.filter(r=>(!f.keyword||`${r.id}${r.contract}${r.parent}${r.phone}${r.children}${r.subproducts}`.includes(f.keyword))&&(f.package==='全部课包'||r.package===f.package)&&(f.validation==='全部校验'||r.validation===f.validation)&&(f.sync==='全部同步'||r.sync===f.sync)&&(state.xOrderView==='all'||r.stage===state.xOrderView));
}

function xOrderListPage() {
  const f=state.xOrderFilters;
  const rows=getFilteredXOrderRows();
  const counts={all:xOrderRows.length,ready:xOrderRows.filter(r=>r.stage==='ready').length,blocked:xOrderRows.filter(r=>r.stage==='blocked').length,pending:xOrderRows.filter(r=>r.stage==='pending').length,done:xOrderRows.filter(r=>r.stage==='done').length};
  const readyRows=xOrderRows.filter(r=>r.stage==='ready');
  return `<section class="xorder-center"><section class="xorder-hero"><div><span class="eyebrow">X学院管理 · 订单资格转换</span><h2>待开通订单</h2><p>SCRM 完成成交和合同归档后，运营在此完成前置校验，将商业订单转换为父母账号的X学院服务资格。这里不会分配班级、营期或营位。</p></div><div class="xorder-flow"><span class="done"><i>1</i><b>SCRM订单</b><small>课包+子产品</small></span><em>→</em><span class="done"><i>2</i><b>合同归档</b><small>父母+孩子</small></span><em>→</em><span class="active"><i>3</i><b>开通资格</b><small>次数+范围</small></span><em>→</em><span><i>4</i><b>家长预约</b><small>选择营期</small></span></div></section><section class="xorder-kpis"><article><small>待处理订单</small><b>${counts.ready+counts.pending}</b><em>需要运营处理</em></article><article class="ready"><small>可直接开通</small><b>${counts.ready}</b><em>全部前置条件通过</em></article><article class="blocked"><small>异常阻断</small><b>${counts.blocked}</b><em>需补条件或人工确认</em></article><article class="done"><small>今日已开通</small><b>${counts.done}</b><em>已生成服务资格</em></article></section><nav class="xorder-view-tabs"><button class="active">全部 <em>${counts.all}</em></button><button>可开通 <em>${counts.ready}</em></button><button>待匹配 <em>${counts.pending}</em></button><button>异常阻断 <em>${counts.blocked}</em></button><button>已开通 <em>${counts.done}</em></button></nav><section class="table-card xorder-list-card"><div class="filter-panel xorder-filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="xOrderKeyword" class="input" value="${f.keyword}" placeholder="订单 / 合同 / 父母 / 手机 / 孩子"></label><label class="filter-field"><span>销售课包</span><select id="xOrderPackage" class="select">${['全部课包','自然探索成长课包','领导力成长课包'].map(x=>`<option ${x===f.package?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>前置校验</span><select id="xOrderValidation" class="select">${['全部校验','全部通过','待匹配','证件重复','合同缺失','订单未结清'].map(x=>`<option ${x===f.validation?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>同步状态</span><select id="xOrderSync" class="select">${['全部同步','待开通','待处理','人工处理','待补条件','暂缓','已开通'].map(x=>`<option ${x===f.sync?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>合同时间</span><select class="select"><option>近30天</option><option>近7天</option><option>今天</option></select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-xorder-filters">重置</button><button class="btn btn--primary" data-action="apply-xorder-filters">查询</button></div></div><div class="xorder-batch-bar"><span>当前结果 <b>${rows.length}</b> 条 · 已选择 <b>${state.selectedXOrders.size}</b> 条</span><div><button class="btn btn--outline compact" data-action="batch-open-xorders" ${state.selectedXOrders.size?'':'disabled'}>批量开通${readyRows.length?`（可开通 ${readyRows.length}）`:''}</button><button class="btn btn--outline compact">导出校验结果</button><button class="btn btn--outline compact" data-action="sync-xorders">重新同步</button></div></div><div class="table-scroll"><table class="data-table xorder-table"><thead><tr><th><input type="checkbox" data-action="select-all-xorders"></th><th>订单 / 合同</th><th>父母账号</th><th>销售课包 / 关联子产品</th><th>合同孩子</th><th>前置校验</th><th>开通结果</th><th>更新时间</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td><input type="checkbox" data-xorder-select="${r.id}" ${state.selectedXOrders.has(r.id)?'checked':''}></td><td><b>${r.id}</b><small>${r.contract}</small></td><td><b>${r.parent}</b><small>${r.phone}</small></td><td><b>${r.package}</b><small>${r.subproducts}</small></td><td><div class="xorder-children"><b>${r.children}</b><small>${r.children.split('、').length} 个候选服务对象</small></div></td><td><span class="tag ${r.stage==='ready'||r.stage==='done'?'green':r.stage==='blocked'?'red':'amber'}">${r.validation}</span><small>${r.detail}</small></td><td><span class="tag ${r.stage==='done'?'green':r.stage==='ready'?'purple':r.stage==='blocked'?'red':'amber'}">${r.sync}</span>${r.stage==='done'?'<small>资格已生成</small>':''}</td><td>${r.updated}</td><td><div class="row-actions"><button data-action="open-x-order" data-xorder-id="${r.id}">详情</button>${r.stage==='ready'?`<button class="primary" data-action="open-x-order" data-xorder-id="${r.id}">开通</button>`:r.stage==='blocked'?`<button data-action="xorder-manual" data-xorder-id="${r.id}">处理异常</button>`:''}</div></td></tr>`).join(''):`<tr><td colspan="9"><div class="list-empty">没有符合当前筛选条件的待开通订单</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button disabled>›</button></div></div></section><section class="xorder-boundary-note"><i>i</i><div><b>开通资格不等于报名营期</b><p>开通只生成父母账号的服务资格、次数、有效期和课程范围；合同孩子要在家长端选择具体营期时再次确认，系统不会提前占用营位。</p></div></section></section>`;
}

function renderOps() {
  const pages = {
    orderRouting: () => `<section class="ops-domain-banner"><div><span class="eyebrow">一个订单入口 · 两条履约链路</span><h2>订单按产品业务线自动路由</h2><p>SCRM订单仍统一进入传承后台；家长成长产品进入原待分配流程，X学院课包进入独立的服务资格开通流程。</p></div><div class="domain-route-map"><span><i>单</i><b>SCRM订单</b></span><em>→</em><span class="parent"><i>家</i><b>家长待分配</b></span><span class="college"><i>X</i><b>X学院待开通</b></span></div></section><div class="kpi-grid"><article class="kpi"><span>今日接收订单</span><strong>23</strong><small>来自SCRM统一同步</small></article><article class="kpi"><span>家长服务订单</span><strong>15</strong><small>进入原待分配列表</small></article><article class="kpi"><span>X学院订单</span><strong>6</strong><small>等待服务资格开通</small></article><article class="kpi"><span>路由异常</span><strong>2</strong><small style="color:var(--danger)">产品映射待处理</small></article></div><section class="table-card integration-table"><div class="card-head"><div><h2>最近订单路由</h2><small>路由结果只决定后续履约域，不改变SCRM订单与合同事实</small></div><button class="btn btn--outline">查看路由规则</button></div><table class="data-table"><thead><tr><th>订单</th><th>客户 / 父母账号</th><th>销售产品</th><th>业务线</th><th>路由结果</th><th>当前状态</th><th>操作</th></tr></thead><tbody><tr><td>D260817-00231<small>合同已归档</small></td><td>林女士<small>138****3821</small></td><td>自然探索成长课包<small>2个关联子产品</small></td><td><span class="domain-tag college">X学院</span></td><td>X学院待开通</td><td><span class="tag amber">待处理</span></td><td><button class="scrm-link" data-action="open-x-order">处理</button></td></tr><tr><td>D260817-00228<small>已结清</small></td><td>周女士<small>136****1028</small></td><td>明心营升级</td><td><span class="domain-tag parent">家长服务</span></td><td>新待分配列表</td><td><span class="tag purple">待分班</span></td><td><button class="scrm-link" data-ops-page="legacyAssign">查看</button></td></tr><tr><td>D260817-00219<small>已结清</small></td><td>陈先生<small>139****6620</small></td><td>未识别测试产品</td><td><span class="domain-tag error">未识别</span></td><td>路由异常</td><td><span class="tag red">需映射</span></td><td><button class="scrm-link">配置产品</button></td></tr></tbody></table></section>`,
    legacyAssign: () => `<section class="legacy-context-strip"><span><b>原有家长服务流程保持不变</b><small>订单同步 → 待分配 → 阶段 / 班级 / 督导 → 持续服务与进阶</small></span><span class="domain-tag parent">家长成长服务</span></section><section class="table-card"><div class="toolbar"><div class="toolbar__group"><input class="input" placeholder="手机号"><input class="input" placeholder="学员姓名"><input class="input" placeholder="购买课程"><button class="btn btn--primary">搜索</button></div><div><button class="btn btn--outline">批量分配</button><button class="btn btn--outline">同步待分配订单</button></div></div><table class="data-table"><thead><tr><th>学员姓名</th><th>手机号</th><th>购买课程</th><th>规划师</th><th>价格</th><th>创建时间</th><th>操作</th></tr></thead><tbody><tr><td>测试传承班级1</td><td>183****1345</td><td>传承营</td><td>来源用户</td><td>¥2,000</td><td>2026-08-17 09:37</td><td><button class="btn btn--primary compact" data-action="legacy-assign">分配订单</button></td></tr><tr><td>周慧慧</td><td>166****0101</td><td>明心营升级</td><td>周少</td><td>¥12,800</td><td>2026-08-17 08:42</td><td><button class="btn btn--primary compact" data-action="legacy-assign">分配订单</button></td></tr></tbody></table></section>`,
    legacyClasses: () => `<section class="legacy-context-strip"><span><b>常规班级</b><small>面向家长长期服务，核心字段是阶段、总督导、督导团与进阶状态</small></span><span class="domain-tag parent">原有能力</span></section><section class="table-card"><div class="card-head"><h2>常规班级</h2><button class="btn btn--primary">＋ 创建班级</button></div><table class="data-table"><thead><tr><th>部门</th><th>班级状态</th><th>阶段</th><th>总督导</th><th>督导</th><th>督导团</th><th>班级人数</th><th>进阶状态</th></tr></thead><tbody><tr><td>测试</td><td><span class="tag green">开班中</span></td><td>明心营</td><td>谌指导师</td><td>黄树诚</td><td>刘刘留</td><td>24</td><td>可进阶4人 · 进阶率25%</td></tr><tr><td>南昌组</td><td><span class="tag amber">暂停中</span></td><td>冥想营</td><td>陈毅北</td><td>黄树诚</td><td>—</td><td>18</td><td>可进阶4人 · 进阶率0%</td></tr></tbody></table><div class="legacy-boundary-note"><b>不会用于X学院成交后的直接分配</b><p>X学院必须等家长完成孩子与营期预约后，再在具体营期下形成执行班组。</p></div></section>`,
    legacyStages: () => `<section class="legacy-context-strip"><span><b>阶段管理</b><small>现有阶段编码继续服务家长成长体系，不与X学院课程或营期混用</small></span><span class="domain-tag parent">原有能力</span></section><section class="table-card"><div class="card-head"><h2>阶段预设</h2><button class="btn btn--primary">＋ 新增阶段</button></div><div class="stage-chip-grid"><span><i>1</i>明心营</span><span><i>2</i>启智营</span><span><i>3</i>传承营</span><span><i>4</i>冥想营</span><span><i>5</i>紫手环行动</span><span><i>13</i>少年智</span></div><div class="legacy-boundary-note"><b>“少年智”阶段不等于X学院履约模型</b><p>阶段可以作为业务标签保留，但X学院仍需独立的课程、营期、预约、营位与执行名单对象。</p></div></section>`,
    xorders: () => `<section class="xcollege-context-strip"><div><span class="eyebrow">X学院管理</span><h2>待开通订单</h2><p>订单和合同条件满足后，为父母账号开通X学院服务资格；此时不分班、不选营期。</p></div><div class="xcollege-rule"><span>课包决定<b>次数与有效期</b></span><span>子产品决定<b>课程服务范围</b></span><span>合同孩子决定<b>候选服务对象</b></span></div></section><section class="table-card"><div class="toolbar"><div class="toolbar__group"><input class="input" placeholder="订单 / 手机号 / 父母姓名"><select class="select"><option>全部校验状态</option><option>可开通</option><option>资料异常</option></select></div><span class="muted">共 6 条待处理</span></div><table class="data-table"><thead><tr><th>订单 / 合同</th><th>父母账号</th><th>销售课包</th><th>已选子产品</th><th>合同孩子</th><th>前置校验</th><th>操作</th></tr></thead><tbody><tr><td>D260817-00231<small>HT260817-00112</small></td><td>林女士<small>138****3821 · 已匹配</small></td><td>自然探索成长课包<small>5次 · 12个月</small></td><td>东北雄鹰、沙漠星空</td><td>张小满、张小安</td><td><span class="tag green">全部通过</span></td><td><button class="btn btn--primary compact" data-action="open-x-order">开通资格</button></td></tr><tr><td>D260817-00225<small>HT260817-00108</small></td><td>赵女士<small>139****0911 · 已匹配</small></td><td>自然探索成长课包<small>5次 · 12个月</small></td><td>云南雨林</td><td>赵一诺</td><td><span class="tag red">证件重复</span></td><td><button class="btn btn--outline compact" data-action="open-x-order">人工处理</button></td></tr></tbody></table></section>`,
    courses: () => `<section class="product-summary"><div><span class="eyebrow">课程内容 → 营期履约 → 家长预约</span><h2>课程内容只配置一次，营期按批次复用</h2><p>课程管理家长看到什么与适用什么权益；营期管理何时出发、去哪里和有多少营位。</p></div><button class="btn btn--primary" data-action="new-course">＋ 创建课程</button></section><section class="table-card"><div class="toolbar"><div class="toolbar__group"><input class="input" placeholder="搜索课程名称 / 编码"><select class="select"><option>全部状态</option><option>已发布</option><option>草稿</option><option>已停用</option></select></div><span class="muted">共 ${state.courses.length} 门课程</span></div><table class="data-table course-table"><thead><tr><th>课程</th><th>类型 / 适龄</th><th>适用课包</th><th>详情页</th><th>营期</th><th>状态</th><th>操作</th></tr></thead><tbody>${state.courses.map((course,index)=>`<tr><td><div class="course-cell"><span>${course.name.slice(0,1)}</span><div><b>${course.name}</b><small>${course.id}</small></div></div></td><td>${course.type}<small>${course.age}</small></td><td>${course.package}</td><td><button class="detail-status ${course.detailStatus==='已配置'?'ready':''}" data-action="course-page-config" data-course-index="${index}">${course.detailStatus||'未配置'} ›</button></td><td><b>${course.sessions}</b> 个</td><td><span class="tag ${course.status==='已发布'?'green':'amber'}">${course.status}</span></td><td><div class="row-actions"><button data-action="course-detail" data-course-index="${index}">编辑</button>${index===0?`<button data-action="preview-course-detail">预览</button>`:''}<button class="primary" data-action="new-session-for-course" data-course="${course.name}">创建营期</button></div></td></tr>`).join('')}</tbody></table></section>`,
    dashboard: () => `<div class="kpi-grid"><article class="kpi"><span>营位使用</span><strong>45 / 50</strong><small>90% · 剩余 5 位</small></article><article class="kpi"><span>已确认参营</span><strong>35</strong><small>较昨日 +6</small></article><article class="kpi"><span>待补资料</span><strong>8</strong><small style="color:var(--warning)">交通凭证 5 · 健康 3</small></article><article class="kpi"><span>待处理审批</span><strong>${state.approvals.length}</strong><small style="color:var(--danger)">最早已等待 2小时18分</small></article></div>
      <div class="admin-grid"><section class="chart-card"><div class="card-head"><div><h2>营位与预约结构</h2><small>所有数字均为原型演示数据</small></div><span class="tag purple">实时库存</span></div><div class="capacity-ring"><div class="ring-wrap"><div class="ring"></div><div class="ring-label"><strong>90%</strong><span>营位使用率</span></div></div><div class="legend"><div><span style="--dot:#7357e8">已确认参营</span><b>35</b></div><div><span style="--dot:#47a99e">待参营确认</span><b>6</b></div><div><span style="--dot:#edb263">预留 / 审批</span><b>4</b></div><div><span style="--dot:#d9d5df">剩余营位</span><b>5</b></div></div></div></section>
      <section class="chart-card"><div class="card-head"><div><h2>资料完成度</h2><small>进入名单锁定前的阻断项</small></div></div><div class="bar-list"><div class="bar-row"><span>基础信息</span><div class="bar-track"><i style="--w:100%;--c:#2f9273"></i></div><b>50</b></div><div class="bar-row"><span>出行信息</span><div class="bar-track"><i style="--w:88%"></i></div><b>44</b></div><div class="bar-row"><span>健康资料</span><div class="bar-track"><i style="--w:94%;--c:#47a99e"></i></div><b>47</b></div><div class="bar-row"><span>接送安排</span><div class="bar-track"><i style="--w:82%;--c:#edb263"></i></div><b>41</b></div></div></section></div><div style="margin-top:18px">${reservationTable(true)}</div>`,
    reservations: () => reservationTable(),
    approvals: () => `<section class="detail-card"><div class="card-head"><div><h2>审批中心</h2><small>特殊情况走审批，所有决定写入操作审计与权益流水</small></div><span class="status status--warn">${state.approvals.length} 项待处理</span></div><div class="approval-list">${state.approvals.length?state.approvals.map(a=>`<article class="approval-card" data-approval="${a.id}"><span class="rule-icon ${a.type==='合同异常'?'red':a.type==='取消申请'?'amber':'violet'}">${a.icon}</span><div><h3>${a.type} · ${a.name}</h3><p>${a.detail} · ${a.risk}</p></div><div class="approval-actions"><button data-view-approval="${a.id}">详情</button><button class="approve" data-approve="${a.id}">通过</button></div></article>`).join(""):'<div style="padding:50px;text-align:center;color:var(--ink-3)">✓ 当前没有待审批事项</div>'}</div></section>`,
    entitlements: () => `<div class="kpi-grid"><article class="kpi"><span>有效服务资格</span><strong>286</strong><small>父母账号维度</small></article><article class="kpi"><span>当前可用次数</span><strong>912</strong><small>可用于预约</small></article><article class="kpi"><span>预约冻结</span><strong>48</strong><small>签到前暂不核销</small></article><article class="kpi"><span>本月已使用</span><strong>67</strong><small>签到后正式消耗</small></article></div><section class="table-card qualification-table"><div class="card-head"><div><h2>X学院服务资格</h2><small>父母账号拥有资格；合同孩子是候选服务对象，订单子产品限定课程范围</small></div><button class="btn btn--outline">导出当前结果</button></div><table class="data-table"><thead><tr><th>资格编号</th><th>父母账号</th><th>来源订单</th><th>课包</th><th>可用课程范围</th><th>合同孩子</th><th>次数</th><th>有效期</th><th>操作</th></tr></thead><tbody><tr><td>XQ-202608-0284</td><td>林女士<small>138****3821</small></td><td>D260817-00231</td><td>自然探索成长课包</td><td>东北雄鹰、沙漠星空</td><td>张小满、张小安</td><td><b>5</b> / 5次</td><td>2027-08-16</td><td><button class="scrm-link" data-action="view-qualification">详情</button></td></tr><tr><td>XQ-202608-0279</td><td>赵女士<small>139****0911</small></td><td>D260812-00188</td><td>自然探索成长课包</td><td>云南雨林</td><td>赵一诺</td><td><b>3</b> / 5次</td><td>2027-08-11</td><td><button class="scrm-link" data-action="view-qualification">详情</button></td></tr></tbody></table></section>`,
    approvals: approvalListPage,
    entitlements: qualificationListPage,
    dashboard: sessionManagementPage,
    sessionRoster: sessionRosterPage,
    postCamp: postCampManagementPage,
    settings: () => `<section class="detail-card"><div class="card-head"><div><h2>营期规则参数</h2><small>参数归营期配置，不再作为业务架构待确认项</small></div><button class="btn btn--primary" data-action="save-settings">保存配置</button></div><div class="setting-row"><span><b>参营确认截止时间</b><small>超过截止时间后释放预占营位与冻结权益</small></span><input class="input" type="datetime-local" value="2026-08-01T20:00"></div><div class="setting-row"><span><b>名单锁定时间</b><small>锁定后取消、改期和更换营员进入审批</small></span><input class="input" type="datetime-local" value="2026-08-02T18:00"></div><div class="setting-row"><span><b>候补递补确认窗口</b><small>默认建议 24 小时，临近开营可缩短</small></span><select class="select"><option>24 小时</option><option>12 小时</option><option>4 小时</option></select></div><div class="setting-row"><span><b>飞机 / 高铁凭证必传</b><small>按交通方式控制，不按课程类型硬编码</small></span><button class="toggle is-on" aria-label="切换"></button></div><div class="setting-row"><span><b>自驾 / 统一交通凭证必传</b><small>当前营期默认不要求</small></span><button class="toggle" aria-label="切换"></button></div><div class="setting-row"><span><b>锁定后取消权益恢复</b><small>由审批原因与特殊豁免结果决定</small></span><span class="tag amber">必须审批</span></div></section>`,
    audit: () => `<section class="table-card"><div class="card-head"><div><h2>关键操作审计</h2><small>历史事实不可覆盖；每次状态变更保留前后值、操作者与原因</small></div><button class="btn btn--outline">导出审计日志</button></div><table class="data-table"><thead><tr><th>时间</th><th>对象</th><th>动作</th><th>变更</th><th>操作者</th><th>来源</th></tr></thead><tbody><tr><td>15:20:12</td><td>RSV-0142</td><td>创建预约</td><td>待预约 → 待参营确认</td><td>林女士</td><td>兴智 App</td></tr><tr><td>15:20:13</td><td>ENT-28411</td><td>冻结权益</td><td>可用 4 → 3 / 冻结 0 → 1</td><td>系统</td><td>预约服务</td></tr><tr><td>14:08:44</td><td>AP-240813-04</td><td>提交取消申请</td><td>已确认参营 → 取消申请中</td><td>赵女士</td><td>兴智 App</td></tr></tbody></table></section>`,
  };
  pages.xorders = xOrderListPage;
  pages.childUsers = childUserListPage;
  $("#opsContent").innerHTML = pages[state.opsPage]();
  $("#opsContent").classList.toggle("ops-premium",["xorders","entitlements","courses","dashboard","postCamp","reservations","approvals"].includes(state.opsPage));
  $("#opsContent").dataset.page=state.opsPage;
  if(state.opsPage==="xorders") {
    const viewKeys=["all","ready","pending","blocked","done"];
    $$("#opsContent .xorder-view-tabs button").forEach((button,index)=>{
      button.dataset.xorderView=viewKeys[index];
      button.classList.toggle("active",state.xOrderView===viewKeys[index]);
    });
    const exportButton=$$("#opsContent .xorder-batch-bar button").find(button=>button.textContent.includes("导出校验结果"));
    if(exportButton) exportButton.dataset.action="export-xorders";
  }
  if(state.opsPage==="dashboard") {
    $$("#opsContent .session-list-table .row-actions").forEach((actions)=>{ const sessionIndex=actions.querySelector('[data-session-index]')?.dataset.sessionIndex||0; actions.insertAdjacentHTML("afterbegin",`<button data-action="session-enrollment" data-session-index="${sessionIndex}">报名情况</button>`); });
    const staffHeader=$$("#opsContent .session-list-table th").find(th=>th.textContent.includes("负责人"));
    if(staffHeader) staffHeader.textContent="负责人 / 教师 / 助教";
    $$("#opsContent .session-list-table tbody tr").forEach(row=>{ const session=campSessions.find(item=>row.children[0]?.textContent.includes(item.name)); const cell=row.children[3]; if(session&&cell) cell.innerHTML=`<b>${session.leader}</b><small>教师：${session.teachers}</small><small class="assistant-line">助教：${session.assistants||'待添加'}</small>`; });
    $$("#opsContent .session-list-table tbody tr").forEach(row=>{ const session=campSessions.find(item=>row.children[0]?.textContent.includes(item.name)); const actions=row.querySelector(".row-actions"); if(session?.status==="已结束"&&actions) actions.insertAdjacentHTML("afterbegin",'<button class="post-camp-entry" data-ops-page="postCamp">营后报告</button>'); });
  }
  if(state.opsPage==="sessionRoster") {
    const headerRow=$("#opsContent .roster-table thead tr");
    const attentionHeader=$$("#opsContent .roster-table th").find(th=>th.textContent.includes("重点关注"));
    if(headerRow&&attentionHeader&&!headerRow.querySelector(".assessment-column")){ const th=document.createElement("th"); th.className="assessment-column"; th.textContent="入营前六维"; headerRow.insertBefore(th,attentionHeader); }
    const completedNames=new Set(["张小满","周可乐","陈星野","王予安","陈以礼"]);
    $$("#opsContent .roster-table tbody tr").forEach((row,index)=>{ const name=sessionRosterRows[index]?.name; const attentionCell=row.children[row.children.length-2]; if(attentionCell&&!row.querySelector(".assessment-cell")){ const td=document.createElement("td"); td.className="assessment-cell"; td.innerHTML=completedNames.has(name)?'<span class="tag green">已完成</span><small>基线已保存</small>':'<span class="tag amber">待完成</span><small>行前任务</small>'; row.insertBefore(td,attentionCell); } const actionButton=row.querySelector('[data-action="manual-group"],[data-action="request-regroup"]'); if(actionButton) actionButton.dataset.rosterIndex=String(index); });
    const kpis=$("#opsContent .roster-kpi-grid");
    if(kpis&&!kpis.querySelector(".assessment-kpi")) kpis.insertAdjacentHTML("beforeend",'<article class="assessment-kpi"><span>入营前六维</span><b>24</b><small class="warn">5人待完成</small></article>');
  }
  if(state.opsPage==="courses") {
    $$("#opsContent .course-table .row-actions").forEach((actions,index)=>actions.insertAdjacentHTML("beforeend",`<button class="course-rule-button ${index<3?'ready':''}" data-action="course-rules" data-course-index="${index}">${index<3?'规则配置':'配置规则'}</button>`));
  }
  const opsMeta={orderRouting:["订单中心","传承后台 / 通用业务"],legacyAssign:["待分配列表","传承后台 / 家长成长服务"],legacyClasses:["常规班级","传承后台 / 家长成长服务"],legacyStages:["阶段管理","传承后台 / 家长成长服务"],xorders:["X学院待开通订单","传承后台 / X学院管理"],entitlements:["X学院服务资格","传承后台 / X学院管理"],childUsers:["营员与家庭","传承后台 / X学院管理"],courses:["X学院课程","传承后台 / X学院管理"],dashboard:["营期管理","传承后台 / X学院管理"],sessionRoster:["营期报名与分组","传承后台 / X学院管理 / 营期管理"],postCamp:["营后管理","传承后台 / X学院管理"],reservations:["预约中心","传承后台 / X学院管理"],approvals:["审批中心","传承后台 / X学院管理"],settings:["规则配置","传承后台 / X学院管理"],audit:["操作审计","传承后台 / X学院管理"]}[state.opsPage]||["订单中心","传承后台"];
  $("#opsTitle").textContent = opsMeta[0];
  $("#opsCrumb").textContent = opsMeta[1];
  $("#opsHeaderActions").innerHTML = state.opsPage === "courses" ? `<button class="btn btn--primary" data-action="new-course">＋ 创建课程</button>` : state.opsPage === "dashboard" ? `<button class="btn btn--outline" id="sessionSelector">新疆自然探索 · 08/03–08/10⌄</button><button class="btn btn--primary" data-action="new-session">新建营期</button>` : state.opsPage === "xorders" ? `<button class="btn btn--outline" data-action="sync-xorders">同步待开通订单</button>` : state.opsPage === "childUsers" ? `<button class="btn btn--outline">导出用户关系</button>` : '';
  $$('[data-ops-page]').forEach((el)=>el.classList.toggle("is-active",el.dataset.opsPage===(state.opsPage==='sessionRoster'?'dashboard':state.opsPage)));
}

function legacyAssignModal(){
  openModal(`<span class="eyebrow">家长成长服务 · 分配订单</span><h2>分配到原有服务体系</h2><p class="modal-lead">家长课程继续按既有方式分配阶段、班级和督导，不进入X学院课程与营期体系。</p><div class="form-grid"><div class="form-field"><label>学员</label><input value="周慧慧 · 166****0101" disabled></div><div class="form-field"><label>购买课程</label><input value="明心营升级" disabled></div><div class="form-field"><label>阶段 *</label><select><option>明心营</option><option>启智营</option><option>传承营</option></select></div><div class="form-field"><label>部门 *</label><select><option>南昌组</option><option>测试</option></select></div><div class="form-field"><label>常规班级 *</label><select><option>明心营 · 南昌第08班</option><option>明心营 · 南昌第09班</option></select></div><div class="form-field"><label>督导 *</label><select><option>黄树诚</option><option>陈毅北</option></select></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="confirm-legacy-assign">确认分配</button></div>`);
}

function openXOrderDrawer(orderId="D260817-00231"){
  const order=xOrderRows.find(item=>item.id===orderId)||xOrderRows[0];
  const isReady=order.stage==="ready";
  const isDone=order.stage==="done";
  const statusClass=isDone?"green":isReady?"purple":order.stage==="blocked"?"red":"amber";
  const checks=[
    {name:"订单已结清",ok:order.validation!=="订单未结清",note:order.validation==="订单未结清"?"仍有 ¥6,800 未收款":"财务状态满足开通条件"},
    {name:"电子合同已归档",ok:order.validation!=="合同缺失",note:order.validation==="合同缺失"?"合同尚未归档，禁止开通":order.contract},
    {name:"父母账号已匹配",ok:order.validation!=="待匹配",note:`${order.parent} · ${order.phone}`},
    {name:"合同孩子身份已校验",ok:order.validation!=="证件重复",note:order.validation==="证件重复"?"证件与历史 student_id 重复，需确认归属":order.children}
  ];
  const qualificationId=order.id==="D260814-00152"?"XQ-202608-0268":"开通后自动生成";
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">X学院订单资格转换</span><h2>${order.id}</h2><span class="tag ${statusClass}">${order.sync}</span></div><button class="drawer__close" data-close-drawer>×</button></div>
    <section class="drawer-section"><h3>订单与账号</h3><div class="info-grid"><div class="info-item"><span>合同编号</span><b>${order.contract}</b></div><div class="info-item"><span>父母账号</span><b>${order.parent} · ${order.phone}</b></div><div class="info-item"><span>销售课包</span><b>${order.package}</b></div><div class="info-item"><span>同步时间</span><b>${order.updated}</b></div></div></section>
    <section class="drawer-section"><h3>前置校验</h3><div class="qualification-checks">${checks.map(check=>`<div class="${check.ok?'':'is-error'}"><i>${check.ok?'✓':'!'}</i><span><b>${check.name}</b><small>${check.note}</small></span><em class="tag ${check.ok?'green':'red'}">${check.ok?'通过':'阻断'}</em></div>`).join('')}</div>${!isReady&&!isDone?`<div class="xorder-block-reason"><b>当前不能开通</b><p>${order.detail}</p></div>`:''}</section>
    <section class="drawer-section"><h3>服务资格生成预览</h3><div class="qualification-summary"><div><span>次数与有效期</span><b>${order.benefits}</b><small>从正式开通时间开始计算</small></div><div><span>可用课程范围</span><b>${order.subproducts}</b><small>由订单关联的子产品映射</small></div><div><span>候选服务对象</span><b>${order.children}</b><small>来自合同，预约具体营期时由父母再次选择</small></div><div><span>资格编号</span><b>${qualificationId}</b><small>资格归属父母账号</small></div></div></section>
    <section class="drawer-section qualification-boundary"><h3>本步骤不会发生</h3><div class="xorder-non-actions"><span>不分配班级</span><span>不选择营期</span><span>不占用营位</span><span>不确定参营孩子</span></div><p>开通完成后，父母才可在兴智应用的X学院中选择孩子、课程和具体营期进行预约。</p></section>
    <section class="drawer-section"><h3>处理记录</h3><div class="xorder-timeline"><div><i></i><span><b>SCRM订单同步</b><small>${order.updated} · 订单及关联子产品快照已接收</small></span></div><div><i></i><span><b>自动前置校验</b><small>${order.detail}</small></span></div>${isDone?'<div><i></i><span><b>服务资格已生成</b><small>结果已同步至父母账号与服务资格列表</small></span></div>':''}</div></section>
    <section class="drawer-section xorder-drawer-actions">${isReady?`<button class="btn btn--outline" data-action="sync-xorders">重新校验</button><button class="btn btn--primary" data-action="confirm-x-qualification" data-xorder-id="${order.id}">确认开通X学院服务资格</button>`:isDone?`<button class="btn btn--primary" data-action="view-qualification">查看服务资格</button>`:`<button class="btn btn--outline" data-action="sync-xorders">重新校验</button><button class="btn btn--primary" data-action="xorder-manual" data-xorder-id="${order.id}">转人工处理</button>`}</section>`);
}

function xOrderManualModal(orderId){
  const order=xOrderRows.find(item=>item.id===orderId)||xOrderRows[0];
  openModal(`<span class="eyebrow">异常订单人工处理</span><h2>${order.id} · ${order.validation}</h2><p class="modal-lead">${order.detail}</p><div class="form-grid"><div class="form-field"><label>处理类型</label><select id="xOrderManualType"><option>补充条件后重新校验</option><option>合并已有 student_id</option><option>更换父母账号匹配</option><option>退回SCRM补充合同</option><option>暂缓开通</option></select></div><div class="form-field"><label>负责人</label><select><option>X学院运营 · 李航</option><option>合同审核 · 周岚</option><option>客户数据专员 · 王森</option></select></div><div class="form-field form-field--full"><label>处理备注</label><textarea id="xOrderManualNote" rows="4" placeholder="请填写判断依据、补充材料或后续动作"></textarea></div></div><div class="xorder-manual-warning"><b>人工处理不会绕过硬性条件</b><p>未结清、合同未归档等阻断项必须实际完成后才能重新开通；所有处理意见写入订单审计记录。</p></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="save-xorder-manual" data-xorder-id="${order.id}">保存处理方案</button></div>`);
}

function postCampManagementPage(){
  return `<section class="post-camp-page"><section class="post-camp-hero"><div><span class="eyebrow">结营后的独立业务阶段</span><h2>营后管理</h2><p>营期结束后，从已固化的行前成长基线、营中行为证据和结营测评生成个人成长报告与班级总结。这里是运营处理页，不属于营期配置编辑。</p></div><div class="post-camp-stage"><span class="done"><i>1</i><b>行前基线</b><small>预约确认后采集</small></span><em>→</em><span class="done"><i>2</i><b>营中证据</b><small>行为/徽章/素材</small></span><em>→</em><span class="active"><i>3</i><b>营后汇总</b><small>测评/评语/问卷</small></span><em>→</em><span><i>4</i><b>报告推送</b><small>成长档案沉淀</small></span></div></section><div class="post-camp-kpis"><article><small>待处理营期</small><b>2</b><em>存在未完成报告</em></article><article><small>待确认个人报告</small><b>8</b><em>指导师或营期负责人确认</em></article><article><small>本月已推送</small><b>56</b><em>家长端成长档案</em></article><article><small>满意度回收率</small><b>82%</b><em>74 / 90 个家庭</em></article></div><section class="table-card post-camp-list"><div class="card-head"><div><h2>已结营及结营中营期</h2><small>按营期进入数据准备、报告生成、确认和推送流程</small></div><div><button class="btn btn--outline">导出进度</button><button class="btn btn--outline">批量提醒待补项</button></div></div><table class="data-table"><thead><tr><th>营期</th><th>结营时间</th><th>行前六维基线</th><th>营中证据</th><th>结营测评/评语</th><th>个人报告</th><th>班级报告</th><th>操作</th></tr></thead><tbody><tr><td><b>新疆自然探索营 · 第01期</b><small>29名营员 · 3个班组</small></td><td>2026-08-10<small>已结营7天</small></td><td><span class="tag green">29/29 已固化</span><small>来自行前准备阶段</small></td><td>186条<small>照片/视频 326份</small></td><td><span class="tag amber">24/29</span><small>5人待补结营测评</small></td><td><b>24 / 29</b><small>5份待生成</small></td><td><span class="tag purple">草稿待确认</span></td><td><div class="row-actions"><button class="primary" data-action="open-post-camp-session">进入营后处理</button></div></td></tr><tr><td><b>海洋领导力营 · 第05期</b><small>29名营员 · 3个班组</small></td><td>2026-07-17<small>已完成归档</small></td><td><span class="tag green">29/29 已固化</span><small>来自行前准备阶段</small></td><td>204条<small>照片/视频 418份</small></td><td><span class="tag green">29/29</span><small>全部完成</small></td><td><b>29 / 29</b><small>已全部推送</small></td><td><span class="tag green">已发布</span></td><td><div class="row-actions"><button data-action="preview-camp-report">查看报告</button></div></td></tr></tbody></table></section><section class="post-camp-baseline-note"><i>基</i><div><b>入营前六维测评不在营后阶段填写</b><p>它在父母完成参营确认后进入“行前准备”，建议在名单锁定前完成；开营时固化为成长基线。营后管理只能读取该快照，不能反向修改。</p></div><button data-action="open-pre-assessment-monitor">查看行前测评完成情况</button></section></section>`;
}

function postCampSessionDrawer(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">营后管理 · 新疆自然探索营第01期</span><h2>报告生成与确认</h2><span class="tag amber">5份待补</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>数据源时间线</h3><div class="post-camp-source-timeline"><div class="done"><i>1</i><span><b>入营前六维测评</b><small>2026-07-20 至 2026-08-01 · 行前准备阶段完成并固化 29/29</small></span></div><div class="done"><i>2</i><span><b>营期行为与成长证据</b><small>2026-08-03 至 2026-08-10 · 186条记录、47枚徽章、326份素材</small></span></div><div class="warning"><i>3</i><span><b>结营六维测评与指导师评语</b><small>24/29 已完成 · 5人待补</small></span></div><div><i>4</i><span><b>报告确认与推送</b><small>缺少数据的报告保持待确认，不推送家长</small></span></div></div></section><section class="drawer-section"><h3>待处理营员</h3><div class="post-camp-pending-list"><article><span class="mini-avatar">周</span><span><b>周可乐</b><small>缺少结营六维测评</small></span><button>提醒指导师</button></article><article><span class="mini-avatar">陈</span><span><b>陈星野</b><small>评语待营期负责人复核</small></span><button>去复核</button></article><article><span class="mini-avatar">林</span><span><b>林知夏</b><small>待选择报告精选素材</small></span><button>选择素材</button></article></div></section><section class="drawer-section"><div class="drawer-config-actions"><button class="btn btn--outline" data-action="preview-camp-report">预览已完成报告</button><button class="btn btn--primary" data-action="generate-camp-reports">生成满足条件的报告</button></div></section>`);
}

function preAssessmentMonitorDrawer(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">行前准备 · 成长基线</span><h2>入营前六维测评完成情况</h2><span class="tag green">29/29 已完成</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><div class="pre-assessment-stage-note"><b>所属环节：参营确认后 → 名单锁定前</b><p>父母在兴智应用“我的本期—行前准备”协助孩子完成。该测评用于建立本期成长基线，不影响服务资格，也不替代健康和安全资料。</p></div></section><section class="drawer-section"><h3>完成记录</h3><div class="post-camp-pending-list"><article><span class="mini-avatar">张</span><span><b>张小满</b><small>2026-07-22 20:18完成 · V1问卷已固化</small></span><em class="tag green">已完成</em></article><article><span class="mini-avatar">周</span><span><b>周可乐</b><small>2026-07-24 19:06完成 · V1问卷已固化</small></span><em class="tag green">已完成</em></article><article><span class="mini-avatar">陈</span><span><b>陈星野</b><small>2026-07-25 21:32完成 · V1问卷已固化</small></span><em class="tag green">已完成</em></article></div></section><section class="drawer-section course-rule-inherit-note"><i>i</i><div><b>营后只能读取，不能回填或修改</b><p>营后报告使用开营时固化的测评版本进行前后对比，任何修订必须保留版本与操作记录。</p></div></section>`);
}

function openQualificationDrawerLegacy(){
  openDrawer(`<div class="drawer__head"><div><span class="eyebrow">X学院服务资格</span><h2>XQ-202608-0284</h2><span class="tag green">有效</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>资格归属</h3><div class="info-grid"><div class="info-item"><span>父母账号</span><b>林女士 · 138****3821</b></div><div class="info-item"><span>来源订单</span><b>D260817-00231</b></div><div class="info-item"><span>课包</span><b>自然探索成长课包</b></div><div class="info-item"><span>有效期</span><b>2026-08-17 至 2027-08-16</b></div></div></section><section class="drawer-section"><h3>服务范围</h3><div class="selected-subproducts"><span>东北雄鹰户外体验营</span><span>沙漠星空探索营</span></div><p>仅可预约以上订单所选子产品映射的X学院课程。</p></section><section class="drawer-section"><h3>合同孩子</h3><div class="contract-child-card"><span>候选对象</span><b>张小满</b><small>ST109382 · 合同登记</small></div><div class="contract-child-card"><span>候选对象</span><b>张小安</b><small>ST109411 · 合同登记</small></div><p class="contract-source-hint">孩子必须在预约具体营期时再次选择并完成年龄、冲突、营位与资料校验。</p></section><section class="drawer-section"><h3>次数状态</h3><div class="qualification-usage"><span><b>5</b><small>总次数</small></span><span><b>5</b><small>可用</small></span><span><b>0</b><small>冻结</small></span><span><b>0</b><small>已使用</small></span></div></section>`);
}

function openQualificationDrawerStatic(){ return openQualificationDrawerInteractive();
  openDrawer(`<section class="premium-detail-shell qualification-detail-v2"><div class="drawer__head"><div><span class="eyebrow">服务资格主档 · 父母账号维度</span><h2>XQ-202608-0284</h2><span class="tag green">有效 · 可预约</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="premium-detail-spotlight"><div><small>资格持有人</small><h3>林女士</h3><p>138****3821 · 来源订单 D260817-00231</p><span>自然探索成长课包</span></div><div class="qualification-balance-ring"><strong>5</strong><small>可用 / 5次</small></div></section><nav class="premium-detail-tabs"><button class="active">资格概览</button><button>使用流水</button><button>关联预约</button><button>变更记录</button></nav><section class="drawer-section"><div class="premium-section-title"><span>01</span><div><h3>使用状态</h3><p>次数冻结、核销与恢复均形成独立流水</p></div></div><div class="premium-metric-grid"><article><small>总次数</small><b>5</b><em>订单开通</em></article><article class="success"><small>当前可用</small><b>5</b><em>可创建预约</em></article><article><small>预约冻结</small><b>0</b><em>签到前冻结</em></article><article><small>已核销</small><b>0</b><em>签到后消耗</em></article></div></section><section class="drawer-section"><div class="premium-section-title"><span>02</span><div><h3>服务范围与候选孩子</h3><p>课包定义次数，订单子产品定义课程范围</p></div></div><div class="qualification-scope-v2"><article><header><i>课</i><span><b>可预约课程</b><small>订单关联子产品映射</small></span></header><div><span>东北雪境探索营</span><span>沙漠星空探索营</span></div></article><article><header><i>孩</i><span><b>候选服务对象</b><small>预约营期时再次校验</small></span></header><div class="candidate-child-list"><button data-child-user="STU-240381"><i>张</i><span><b>张小满</b><small>STU-240381 · 12岁</small></span><em>查看主档 ›</em></button><button data-child-user="STU-240396"><i>张</i><span><b>张小安</b><small>STU-240396 · 9岁</small></span><em>查看主档 ›</em></button></div></article></div></section><section class="drawer-section"><div class="premium-section-title"><span>03</span><div><h3>有效期与来源</h3><p>合同延期可同步延长未使用资格，历史流水不变</p></div></div><div class="premium-source-row"><span><small>生效时间</small><b>2026-08-17 16:15</b></span><i>→</i><span><small>到期时间</small><b>2027-08-16 23:59</b></span><i>·</i><span><small>来源合同</small><b>HT260817-00112</b></span></div></section><footer class="premium-drawer-footer"><button class="btn btn--outline">查看完整流水</button><button class="btn btn--primary">调整有效期</button></footer></section>`);
}

function qualificationListPage() {
  const f=state.qualificationFilters;
  const rows=qualificationRows.filter(q=>{
    const available=q.total-q.used-q.frozen;
    const balanceMatch=f.balance==='全部次数'||(f.balance==='有可用次数'&&available>0)||(f.balance==='已用完'&&available===0)||(f.balance==='有冻结'&&q.frozen>0);
    return (!f.keyword||`${q.id}${q.parent}${q.phone}${q.order}${q.children}`.includes(f.keyword))
      && (f.status==='全部状态'||q.status===f.status)
      && (f.package==='全部课包'||q.package===f.package)
      && balanceMatch;
  });
  const statusOptions=['全部状态','有效','即将到期','已用完','已失效'];
  const packageOptions=['全部课包','自然探索成长课包','领导力成长课包'];
  const balanceOptions=['全部次数','有可用次数','有冻结','已用完'];
  return `<section class="list-flow-page"><div class="list-flow-intro"><div><span class="eyebrow">父母账号维度</span><h2>X学院服务资格</h2><p>资格由SCRM已生效订单开通；合同孩子作为候选服务对象，关联子产品限定可预约课程范围。</p></div><div class="list-flow-summary qualification"><span><b>286</b><small>有效资格</small></span><span><b>912</b><small>可用次数</small></span><span><b>48</b><small>预约冻结</small></span><span><b>12</b><small>即将到期</small></span></div></div><section class="table-card list-flow-card"><div class="filter-panel"><div class="filter-panel__main"><label class="filter-field grow"><span>搜索</span><input id="qualificationKeyword" class="input" value="${f.keyword}" placeholder="资格编号 / 父母账号 / 手机 / 订单"></label><label class="filter-field"><span>资格状态</span><select id="qualificationStatus" class="select">${statusOptions.map(x=>`<option ${x===f.status?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>来源课包</span><select id="qualificationPackage" class="select">${packageOptions.map(x=>`<option ${x===f.package?'selected':''}>${x}</option>`).join('')}</select></label><label class="filter-field"><span>次数状态</span><select id="qualificationBalance" class="select">${balanceOptions.map(x=>`<option ${x===f.balance?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="filter-panel__actions"><button class="btn btn--outline" data-action="reset-qualification-filters">重置</button><button class="btn btn--primary" data-action="apply-qualification-filters">查询</button></div></div><div class="list-result-bar"><span>共 <b>${rows.length}</b> 条结果 · 已选择 <b>${state.selectedQualifications.size}</b> 条</span><div><button class="btn btn--outline compact" data-action="export-qualifications">导出当前结果</button><button class="btn btn--outline compact" data-action="batch-extend-qualifications" ${state.selectedQualifications.size?'':'disabled'}>批量延长有效期</button></div></div><div class="table-scroll"><table class="data-table list-flow-table qualification-list-table"><thead><tr><th><input type="checkbox" data-action="select-all-qualifications" aria-label="全选" ${rows.length&&rows.every(q=>state.selectedQualifications.has(q.id))?'checked':''}></th><th>资格编号</th><th>父母账号</th><th>来源订单 / 课包</th><th>可用课程范围</th><th>合同孩子</th><th>次数</th><th>有效期</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.length?rows.map(q=>{const available=q.total-q.used-q.frozen;return `<tr><td><input type="checkbox" data-qualification-select="${q.id}" aria-label="选择${q.id}" ${state.selectedQualifications.has(q.id)?'checked':''}></td><td><b>${q.id}</b><small>系统自动开通</small></td><td>${q.parent}<small>${q.phone}</small></td><td><button class="table-link" data-action="view-qualification-source" data-qualification-id="${q.id}">${q.order}</button><small>${q.package}</small></td><td>${q.courses}</td><td>${q.children}</td><td><div class="balance-cell"><b>${available}</b><span>/ ${q.total}次</span>${q.frozen?`<small>冻结 ${q.frozen} 次</small>`:''}</div></td><td>${q.expiry}</td><td><span class="tag ${q.status==='有效'?'green':q.status==='即将到期'?'amber':q.status==='已失效'?'red':''}">${q.status}</span></td><td><div class="row-actions"><button data-action="view-qualification" data-qualification-id="${q.id}">详情</button><button data-action="view-qualification-ledger" data-qualification-id="${q.id}">流水</button></div></td></tr>`}).join(''):`<tr><td colspan="10"><div class="list-empty">没有符合当前筛选条件的服务资格</div></td></tr>`}</tbody></table></div><div class="list-pagination"><span>每页 20 条</span><div><button disabled>‹</button><button class="active">1</button><button>2</button><button>›</button></div></div></section></section>`;
}

function qualificationDetailContent(q,tab){
  const available=q.total-q.used-q.frozen;
  if(tab==='ledger') return `<section class="drawer-section qualification-tab-panel"><div class="premium-section-title"><span>流</span><div><h3>资格使用流水</h3><p>每次开通、冻结、核销、恢复与人工调整都独立留痕</p></div></div><div class="premium-timeline qualification-ledger"><div class="done"><i>✓</i><span><b>服务资格开通 +${q.total}次</b><small>2026-08-17 16:15 · 来源订单 ${q.order} · 系统自动</small></span></div>${q.frozen?`<div class="active"><i>冻</i><span><b>预约冻结 -${q.frozen}次</b><small>2026-08-18 09:32 · 预约提交成功 · 待到营签到后核销</small></span></div>`:''}${q.used?`<div class="done"><i>核</i><span><b>到营核销 -${q.used}次</b><small>历史营期签到完成 · 关联预约与营期永久保留</small></span></div>`:''}<div><i>余</i><span><b>当前剩余 ${available} 次</b><small>冻结次数不计入可用余额，取消或审批恢复后重新释放</small></span></div></div><div class="qualification-audit-note"><b>流水不可删除或覆盖</b><span>业务纠错必须新增一笔冲正/恢复流水，并记录操作人和原因。</span></div></section>`;
  if(tab==='reservations') return `<section class="drawer-section qualification-tab-panel"><div class="premium-section-title"><span>约</span><div><h3>关联预约</h3><p>查看该资格占用过的营位、营员及权益状态</p></div></div><div class="qualification-related-list"><article><div><span class="tag purple">待参营确认</span><b>RSV-202608-0186 · 沙漠星空探索营</b><small>张小满 · 国庆03期 · 2026-10-01 至 10-07</small></div><aside><b>${q.frozen?1:0}次冻结</b><button data-action="qualification-open-reservation">查看预约 ›</button></aside></article>${q.used?`<article><div><span class="tag green">已完成</span><b>RSV-202607-0098 · 历史营期</b><small>${q.children.split('、')[0]} · 已签到并完成营期</small></div><aside><b>${q.used}次已核销</b><button data-action="qualification-open-reservation">查看预约 ›</button></aside></article>`:''}</div><div class="qualification-audit-note"><b>资格与营员的关系</b><span>资格归父母账号；具体预约创建后，冻结/核销记录才关联到实际参营孩子的 student_id。</span></div></section>`;
  if(tab==='changes') return `<section class="drawer-section qualification-tab-panel"><div class="premium-section-title"><span>变</span><div><h3>资格变更记录</h3><p>有效期、状态、范围与人工处理全过程可审计</p></div></div><div class="premium-timeline qualification-ledger"><div class="done"><i>✓</i><span><b>资格自动开通</b><small>2026-08-17 16:15 · SCRM订单生效 · 系统</small></span></div><div class="done"><i>审</i><span><b>订单与合同校验通过</b><small>合同 HT260817-00112 · 候选孩子2名 · 子产品2项</small></span></div><div><i>期</i><span><b>当前有效期至 ${q.expiry}</b><small>暂无人工调整；后续变更将在此追加，不覆盖原记录</small></span></div></div><button class="qualification-inline-action" data-action="adjust-qualification-expiry" data-qualification-id="${q.id}">调整有效期并填写原因</button></section>`;
  return `<section class="drawer-section qualification-tab-panel"><div class="premium-section-title"><span>01</span><div><h3>使用状态</h3><p>次数冻结、核销与恢复均形成独立流水</p></div></div><div class="premium-metric-grid"><article><small>总次数</small><b>${q.total}</b><em>订单开通</em></article><article class="success"><small>当前可用</small><b>${available}</b><em>可创建预约</em></article><article><small>预约冻结</small><b>${q.frozen}</b><em>签到前冻结</em></article><article><small>已核销</small><b>${q.used}</b><em>签到后消耗</em></article></div></section><section class="drawer-section"><div class="premium-section-title"><span>02</span><div><h3>服务范围与候选孩子</h3><p>课包定义次数，订单子产品定义课程范围</p></div></div><div class="qualification-scope-v2"><article><header><i>课</i><span><b>可预约课程</b><small>订单关联子产品映射</small></span></header><div>${q.courses.split('、').map(x=>`<span>${x}</span>`).join('')}</div></article><article><header><i>孩</i><span><b>候选服务对象</b><small>预约营期时再次校验</small></span></header><div class="candidate-child-list"><button data-child-user="STU-240381"><i>张</i><span><b>张小满</b><small>STU-240381 · 12岁</small></span><em>查看主档 ›</em></button><button data-child-user="STU-240396"><i>张</i><span><b>张小安</b><small>STU-240396 · 9岁</small></span><em>查看主档 ›</em></button></div></article></div></section><section class="drawer-section"><div class="premium-section-title"><span>03</span><div><h3>有效期与来源</h3><p>合同延期可同步延长未使用资格，历史流水不变</p></div></div><div class="premium-source-row"><span><small>生效时间</small><b>2026-08-17 16:15</b></span><i>→</i><span><small>到期时间</small><b>${q.expiry} 23:59</b></span><i>·</i><span><small>来源合同</small><b>HT260817-00112</b></span></div></section>`;
}

function openQualificationDrawerInteractive(id='XQ-202608-0284',tab='overview'){
  const q=qualificationRows.find(item=>item.id===id)||qualificationRows[0];
  state.qualificationDetailTab=tab;
  const available=q.total-q.used-q.frozen;
  const tabs=[['overview','资格概览'],['ledger','使用流水'],['reservations','关联预约'],['changes','变更记录']];
  openDrawer(`<section class="premium-detail-shell qualification-detail-v2"><div class="drawer__head"><div><span class="eyebrow">服务资格主档 · 父母账号维度</span><h2>${q.id}</h2><span class="tag ${q.status==='有效'?'green':q.status==='即将到期'?'amber':'red'}">${q.status} · ${available>0?'可预约':'不可预约'}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="premium-detail-spotlight"><div><small>资格持有人</small><h3>${q.parent}</h3><p>${q.phone} · 来源订单 ${q.order}</p><span>${q.package}</span></div><div class="qualification-balance-ring"><strong>${available}</strong><small>可用 / ${q.total}次</small></div></section><nav class="premium-detail-tabs">${tabs.map(([key,label])=>`<button class="${tab===key?'active':''}" data-qualification-tab="${key}" data-qualification-id="${q.id}">${label}</button>`).join('')}</nav>${qualificationDetailContent(q,tab)}<footer class="premium-drawer-footer"><button class="btn btn--outline" data-action="view-qualification-ledger" data-qualification-id="${q.id}">查看完整流水</button><button class="btn btn--primary" data-action="adjust-qualification-expiry" data-qualification-id="${q.id}">调整有效期</button></footer></section>`);
}

function qualificationExpiryModal(id,batch=false){
  const q=qualificationRows.find(item=>item.id===id)||qualificationRows[0];
  const count=batch?state.selectedQualifications.size:1;
  openModal(`<span class="eyebrow">${batch?'批量处理':'资格变更'} · 全程留痕</span><h2>${batch?`延长 ${count} 条服务资格有效期`:`调整 ${q.id} 有效期`}</h2><p class="modal-lead">调整不会覆盖原有效期，将新增一条资格变更记录；已核销的历史履约不受影响。</p><div class="form-grid"><div class="form-field"><label>当前到期时间</label><input value="${batch?'以各资格当前日期为准':q.expiry}" disabled></div><div class="form-field"><label>${batch?'统一延长':'新到期时间'} *</label>${batch?'<select id="qualificationExtendDays"><option value="30">延长30天</option><option value="90">延长90天</option><option value="180">延长180天</option><option value="365">延长1年</option></select>':`<input id="qualificationNewExpiry" type="date" value="2027-09-16" min="${q.expiry}">`}</div><div class="form-field full"><label>调整原因 *</label><select id="qualificationExpiryReason"><option value="合同延期">合同延期</option><option value="特殊审批">特殊审批</option><option value="系统纠错">系统纠错</option><option value="运营补偿">运营补偿</option></select></div><div class="form-field full"><label>补充说明 *</label><textarea id="qualificationExpiryNote" placeholder="填写合同、审批单或业务依据，保存后进入审计记录"></textarea></div></div><div class="qualification-modal-impact"><b>影响说明</b><span>仅调整尚未使用资格的预约有效窗口；历史流水、预约与成长档案不会改变。</span></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="save-qualification-expiry" data-qualification-id="${q.id}" data-batch="${batch?'1':'0'}">保存并生成变更流水</button></div>`);
}

function approvalDetailDrawer(a){
  const impactTone=a.type==='合同异常'?'danger':a.type==='取消申请'?'warning':'primary';
  openDrawer(`<section class="premium-detail-shell approval-detail-v2"><div class="drawer__head"><div><span class="eyebrow">审批单 · ${a.id}</span><h2>${a.type}</h2><span class="tag amber">待审批 · 剩余2小时</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="approval-subject-card"><span class="approval-subject-avatar">${a.name.slice(0,1)}</span><div><small>申请对象</small><h3>${a.name}</h3><p>${a.detail}</p></div><em class="${impactTone}">${a.risk}</em></section><section class="drawer-section"><div class="premium-section-title"><span>01</span><div><h3>审批影响预演</h3><p>通过或驳回前，先看权益、营位、名单和历史数据变化</p></div></div><div class="approval-impact-grid"><article><i>权</i><span><small>服务资格</small><b>${a.risk}</b><em>根据审批结论生成流水</em></span></article><article><i>位</i><span><small>营位与名单</small><b>${a.type==='取消申请'?'释放或保留待定':'重新校验'}</b><em>名单锁定后禁止直接修改</em></span></article><article><i>档</i><span><small>成长历史</small><b>永久保留</b><em>不迁移、不覆盖、不删除</em></span></article><article><i>知</i><span><small>通知对象</small><b>父母账号 + 运营</b><em>结果通过站内信同步</em></span></article></div></section><section class="drawer-section"><div class="premium-section-title"><span>02</span><div><h3>申请材料与判断依据</h3><p>材料只用于本次审批，敏感查看行为自动留痕</p></div></div><div class="approval-evidence-list"><article><i>✓</i><span><b>申请说明</b><small>${a.detail}</small></span><em>已提交</em></article><article><i>✓</i><span><b>相关证明</b><small>${a.type==='取消申请'?'疾病证明 · 1份':'身份与资格校验结果'}</small></span><em>已核验</em></article><article><i>!</i><span><b>运营复核意见</b><small>等待审批人填写处理依据</small></span><em class="pending">待填写</em></article></div><label class="approval-opinion"><span>审批意见 *</span><textarea placeholder="请填写同意或驳回的判断依据，内容将写入操作审计"></textarea></label></section><section class="drawer-section"><div class="premium-section-title"><span>03</span><div><h3>处理时间线</h3><p>申请、复核、决定与业务同步全过程留痕</p></div></div><div class="premium-timeline"><div class="done"><i>✓</i><span><b>父母端提交申请</b><small>2026-08-17 10:42 · 申请材料已接收</small></span></div><div class="active"><i>2</i><span><b>运营审批中</b><small>当前节点 · 剩余处理时效2小时</small></span></div><div><i>3</i><span><b>同步业务结果</b><small>更新预约、资格流水、营位与站内信</small></span></div></div></section><footer class="premium-drawer-footer"><button class="btn btn--outline">转交</button><button class="btn btn--outline">驳回并说明</button><button class="btn btn--primary" data-approve="${a.id}" data-close-drawer>同意并执行</button></footer></section>`);
}

function childAppHeader(title,subtitle=""){
  return `<header class="child-app-header"><div class="child-app-brand"><span>X</span><div><small>X学院 · 孩子空间</small><b>${title}</b></div><button data-child-page="profile" aria-label="打开孩子账号">满</button></div>${subtitle?`<p>${subtitle}</p>`:''}</header>`;
}

function renderChildHome(){
  const done=state.childTaskDone.size;
  const course=getLinkedCourseProfile("desert");
  return `${childAppHeader("早上好，张小满","今天也去发现一个更勇敢的自己吧")}
    <main class="child-mobile-body"><section class="child-camp-hero child-camp-hero--linked" style="--child-course-image:url('${course.hero}')"><div class="child-course-linked-label"><i>联</i><span>与家长端及后台课程配置同步</span></div><div class="child-camp-copy"><span>${course.name} · 国庆03期</span><h2>出发前还有<br><b>2 件事</b>要完成</h2><p>距离开营还有 44 天 · 向日葵2班</p><button data-child-page="tasks">查看我的准备任务 <i>›</i></button></div><div class="child-camp-orbit"><span>勇</span><i></i><em>DAY -44</em></div></section>
    <section class="child-home-progress"><div><span><small>今日进度</small><b>${done}/3</b></span><em><i style="width:${done/3*100}%"></i></em></div><p>${done===3?'今天的任务全部完成啦！':'完成任务后，指导师会给你成长反馈。'}</p></section>
    <div class="child-section-title"><span><small>现在可以做</small><h3>今日任务</h3></span><button data-child-page="tasks">全部任务</button></div><div class="child-task-preview"><button data-child-task="入营前六维测评"><i class="violet">测</i><span><b>完成入营前六维测评</b><small>${state.childAssessmentDone?'已完成并保存成长基线':'大约需要 5 分钟'}</small></span><em>${state.childAssessmentDone?'已完成':'去完成'} ›</em></button><button data-child-task="装备检查"><i class="orange">装</i><span><b>检查我的出发装备</b><small>水壶、防晒、营服和个人药品</small></span><em>${state.childTaskDone.has('装备检查')?'已完成':'去检查'} ›</em></button></div>
    <section class="child-mentor-card"><span class="child-mentor-avatar">陈</span><div><small>我的孩子指导师</small><b>陈毅北老师</b><p>“有任何不确定，都可以来问我。”</p></div><button data-child-page="messages">发消息</button></section>
    <div class="child-section-title"><span><small>最近获得</small><h3>成长徽章</h3></span><button data-child-page="growth">我的成长</button></div><div class="child-badge-strip"><span><i>勇</i><b>勇于尝试</b></span><span><i>协</i><b>团队协作</b></span><span><i>察</i><b>自然观察</b></span></div></main>`;
}

function renderChildTasks(){
  const tasks=[
    {name:'入营前六维测评',meta:'行前准备 · 约5分钟',icon:'测',tone:'violet',done:state.childAssessmentDone},
    {name:'装备检查',meta:'行前准备 · 4项装备',icon:'装',tone:'orange',done:state.childTaskDone.has('装备检查')},
    {name:'给未来的自己写一句话',meta:'成长任务 · 文字或语音',icon:'写',tone:'blue',done:state.childTaskDone.has('给未来的自己写一句话')},
    {name:'认识我的班级伙伴',meta:'开营前开放 · 向日葵2班',icon:'班',tone:'green',locked:true}
  ];
  return `${childAppHeader("我的任务","任务由营期日程生成，完成记录会进入我的成长档案")}
    <main class="child-mobile-body child-task-page"><section class="child-task-summary"><div><strong>${tasks.filter(t=>t.done).length}</strong><span><b>已完成</b><small>共 ${tasks.length} 项准备任务</small></span></div><em><i style="width:${tasks.filter(t=>t.done).length/tasks.length*100}%"></i></em></section><nav class="child-task-filters"><button class="active">全部</button><button>待完成 2</button><button>已完成 ${tasks.filter(t=>t.done).length}</button></nav><div class="child-task-list">${tasks.map(task=>`<button class="${task.done?'done':''} ${task.locked?'locked':''}" ${task.locked?'disabled':`data-child-task="${task.name}"`}><i class="${task.tone}">${task.done?'✓':task.icon}</i><span><b>${task.name}</b><small>${task.meta}</small></span><em>${task.locked?'未开放':task.done?'查看记录':'开始任务'} ›</em></button>`).join('')}</div><section class="child-task-boundary"><i>i</i><span><b>任务不是课程预约</b><small>如果想参加新的课程，可以“告诉家长”；预约和服务资格仍由父母账号处理。</small></span><button data-action="tell-parent">告诉家长</button></section></main>`;
}

function renderChildAssessment(){
  const dimensions=['主动沟通','团队协作','坚持完成','自我管理','复盘表达','勇于尝试'];
  return `${childAppHeader("我的六维测评","根据最近两周真实的自己来选择，没有标准答案")}
    <main class="child-mobile-body child-assessment-page"><section class="child-assessment-intro"><span>营前成长基线</span><h2>${state.childAssessmentDone?'已经完成啦':'看看现在的自己'}</h2><p>${state.childAssessmentDone?'提交内容已保存，开营后可以看到自己的变化。':'每个问题选择最像自己的程度，结果不会影响报名、分班和签到。'}</p></section><div class="child-assessment-list">${dimensions.map((name,index)=>`<article><header><i>${index+1}</i><span><b>${name}</b><small>${['我愿意主动说出自己的想法','我能听取伙伴意见并一起完成任务','遇到困难时我愿意继续尝试','我能照顾好自己的物品和时间','我能说清楚发生了什么和学到了什么','面对陌生挑战时我愿意迈出第一步'][index]}</small></span></header><div class="child-scale" data-child-scale="${name}">${[1,2,3,4,5].map(n=>`<button class="${state.childAssessmentDone&&n===(index%2?4:3)?'active':''}" data-scale-value="${n}">${n}</button>`).join('')}</div><footer><span>还不太像</span><span>非常像我</span></footer></article>`).join('')}</div><label class="child-assessment-note"><span>想补充的一件事（可选）</span><textarea placeholder="例如：这周我主动组织同学完成了一次小组作业"></textarea></label><button class="child-primary-action" data-action="submit-child-assessment">${state.childAssessmentDone?'重新查看提交结果':'提交我的测评'}</button></main>`;
}

function renderChildMessages(){
  if(state.childConversation) return renderChildConversation(state.childConversation);
  const filters=[['all','全部'],['mentor','指导师'],['class','班级群'],['system','通知']];
  const conversations=[
    {type:'mentor',className:'message-mentor',icon:'陈',title:'陈毅北老师',tag:'孩子指导师',preview:'装备检查完成得很认真，有问题随时问我。',time:'09:31',unread:1},
    {type:'class',className:'message-class',icon:'2班',title:'向日葵2班',tag:'班级群',preview:'周老师：欢迎大家先做一个简单的自我介绍。',time:'昨天',unread:2},
    {type:'system',className:'message-system',icon:'系',title:'X学院任务通知',tag:'系统',preview:'入营前六维测评待完成，预计需要5分钟。',time:'昨天',unread:0},
  ].filter(item=>state.childMessageFilter==='all'||item.type===state.childMessageFilter);
  return `${childAppHeader("消息","只显示当前营期和已获监护授权的沟通")}
    <main class="child-mobile-body child-message-page"><nav class="child-message-filters">${filters.map(([key,label])=>`<button class="${state.childMessageFilter===key?'active':''}" data-child-message-filter="${key}">${label}</button>`).join('')}</nav><section class="child-message-safety"><i>盾</i><span><b>受监护的安全沟通</b><small>消息只在孩子、指导师和当前班级范围内流转，家长可查看沟通记录。</small></span></section><div class="child-message-list">${conversations.map(item=>`<button data-child-conversation="${item.type}" class="${item.className}"><i>${item.icon}</i><span><b>${item.title} <em>${item.tag}</em></b><small>${item.preview}</small></span><time>${item.time}${item.unread?`<strong>${item.unread}</strong>`:''}</time></button>`).join('')}</div><section class="child-message-forbidden"><b>孩子账号不能添加陌生好友</b><p>无法搜索其他家长、加入非营期群或查看父母账号的历史会话。</p></section></main>`;
}

function renderChildConversation(type){
  const conversations={
    mentor:{title:'陈毅北老师',subtitle:'孩子指导师 · 家长可查看记录',icon:'陈',message:'装备检查完成得很认真。出发前有任何担心，都可以在这里告诉我。'},
    class:{title:'向日葵2班',subtitle:'当前营期班级群 · 禁止添加陌生好友',icon:'2班',message:'欢迎大家来到向日葵2班！可以用一句话介绍自己最期待的营期活动。'},
    system:{title:'X学院任务通知',subtitle:'系统通知 · 仅可查看',icon:'系',message:'入营前六维测评待完成，预计需要5分钟。'},
  };
  const chat=conversations[type]||conversations.mentor;
  const system=type==='system';
  return `<main class="child-conversation-page"><header class="child-conversation-header"><button data-action="child-conversation-back" aria-label="返回消息列表">‹</button><span><b>${chat.title}</b><small>${chat.subtitle}</small></span><em>安全沟通</em></header><section class="child-conversation-content"><div class="child-chat-date">今天</div><div class="child-chat-bubble incoming"><i>${chat.icon}</i><p>${chat.message}</p></div>${!system?`<div class="child-chat-boundary"><i>盾</i><span>对话受监护并保留安全记录，请勿发送住址、证件和其他敏感信息。</span></div>`:''}</section><footer class="child-conversation-composer ${system?'disabled':''}"><button aria-label="添加内容" ${system?'disabled':''}>＋</button><input aria-label="消息内容" placeholder="${system?'系统通知不可回复':'说点什么…'}" ${system?'disabled':''}><button data-action="send-child-message" ${system?'disabled':''}>发送</button></footer></main>`;
}

function renderChildGrowth(){
  const current=growthSessionHistory[2];
  return `${childAppHeader("我的成长","每一期经历都会留在同一个 student_id 里")}
    <main class="child-mobile-body child-growth-page"><section class="child-growth-hero"><span class="child-growth-avatar">满</span><div><small>STU-240381</small><h2>张小满的成长星球</h2><p>已完成 3 个营期 · 收获 8 条成长证据</p></div></section><section class="child-linked-growth"><div class="child-linked-growth-note"><i>联</i><span><b>同一份成长主档</b><small>与家长端、传承后台同步显示 ${current.name} 的六维变化</small></span></div>${growthRadarPanel(2,false)}</section><div class="child-section-title"><span><small>被看见的瞬间</small><h3>成长证据</h3></span><em>共8条</em></div><div class="child-growth-evidence"><article><span class="evidence-photo desert"></span><div><small>沙漠星空探索营</small><b>第一次主动担任小组记录员</b><p>“我发现把大家的意见写下来，可以让合作更顺利。”</p><em>陈毅北老师 · 已进入成长报告</em></div></article><article><span class="evidence-photo ocean"></span><div><small>海洋领导力营</small><b>在团队意见不同时主动协调</b><p>获得“团队协作”徽章</p><em>周岚老师 · 2026年7月</em></div></article></div><button class="child-outline-action" data-action="child-report-preview">查看完整成长报告</button></main>`;
}

function renderChildProfile(){
  const course=getLinkedCourseProfile("desert");
  return `${childAppHeader("我的")}
    <main class="child-mobile-body child-profile-page child-me-page"><section class="child-me-hero"><span class="child-me-avatar">满</span><div><small>我的成长空间</small><h2>张小满</h2><p>向日葵2班 · ${course.name}</p></div><i>LV.3</i></section><section class="child-me-stat-grid"><button data-child-page="growth"><b>8</b><small>成长证据</small></button><button data-child-page="growth"><b>4</b><small>成长徽章</small></button><button data-child-page="tasks"><b>2</b><small>待完成任务</small></button></section><section class="child-me-section"><h3>我的成长</h3><button data-child-page="growth"><i class="violet">长</i><span><b>成长档案</b><small>查看每一期的六维变化</small></span><em>›</em></button><button data-child-page="growth"><i class="amber">证</i><span><b>成长证据</b><small>老师记录的闪光时刻</small></span><em>›</em></button><button data-child-page="growth"><i class="green">章</i><span><b>我的徽章</b><small>已经收集 4 枚</small></span><em>›</em></button></section><section class="child-me-section"><h3>陪伴我的人</h3><button data-child-page="messages"><i class="blue">陈</i><span><b>陈毅北老师</b><small>我的孩子指导师</small></span><em>发消息</em></button><button data-action="child-help"><i class="soft">助</i><span><b>遇到问题</b><small>联系家长或指导师获得帮助</small></span><em>›</em></button></section><section class="child-me-section child-me-settings"><button data-action="child-login-devices"><i class="soft">设</i><span><b>账号与设备</b><small>查看当前登录设备</small></span><em>›</em></button></section><button class="child-logout" data-action="child-logout">退出孩子账号</button></main>`;
}

function renderXingzhiLogin(){
  return `<main class="xingzhi-login-screen"><div class="xingzhi-login-status"><b>14:56</b><span>▮▮▮　⌁　54</span></div><section class="xingzhi-login-main"><div class="xingzhi-login-brand"><i>兴</i><h1>欢迎使用兴智教育</h1></div><label class="xingzhi-login-field"><b>账号</b><input type="tel" placeholder="请填写手机号"></label><button class="xingzhi-password-entry" type="button">用密码登录</button><button class="xingzhi-send-code" type="button">发送验证码</button><button class="xingzhi-student-entry" data-action="student-login-entry"><span>营员登录</span><small>家长已授权并生成家庭邀请码</small><em>›</em></button></section><button class="xingzhi-server-switch" type="button">服务器切换⌄</button></main>`;
}

function renderChild(){
  const screen=$("#childScreen");
  if(!screen) return;
  const frame=screen.closest('.child-phone-frame');
  frame?.classList.toggle('is-logged-out',!state.childLoggedIn);
  frame?.classList.toggle('is-child-conversation',Boolean(state.childLoggedIn&&state.childConversation));
  if(!state.childLoggedIn){ screen.innerHTML=state.childLoginStage==='main'?renderXingzhiLogin():`<main class="child-login-screen"><button class="child-login-back" data-action="student-login-back" aria-label="返回兴智教育登录页">‹</button><span class="child-login-logo">X</span><small>兴智教育 · 营员空间</small><h1>你好，准备开始<br>自己的成长旅程吗？</h1><p>营员账号需要由家长授权，并绑定已有的成长主档。</p><label><span>家庭邀请码</span><input id="childInviteCode" value="XM2026" maxlength="8"></label><small class="child-invite-visible">演示邀请码：XM2026</small><button data-action="child-login-submit">确认并登录</button><div class="child-login-guardian"><i>林</i><span><b>林女士已发起授权</b><small>绑定营员：张小满 · STU-240381</small></span></div><em>登录即表示同意营员账号使用规则，预约和合同仍由家长处理。</em></main>`; }
  else screen.innerHTML={home:renderChildHome,tasks:renderChildTasks,assessment:renderChildAssessment,messages:renderChildMessages,growth:renderChildGrowth,profile:renderChildProfile}[state.childPage]();
  screen.scrollTop=0;
  $$('[data-child-page]').forEach(el=>el.classList.toggle('is-active',state.childLoggedIn&&el.dataset.childPage===state.childPage));
}

function childTaskModal(name){
  if(name==='入营前六维测评'){state.childPage='assessment';renderChild();return;}
  const done=state.childTaskDone.has(name);
  openModal(`<span class="eyebrow">孩子任务 · 沙漠星空探索营</span><h2>${name}</h2><p class="modal-lead">${name==='装备检查'?'确认准备情况后提交，父母仍可以在行前资料中补充健康和交通信息。':'写给未来营期中的自己，内容将作为成长记录保存。'}</p>${name==='装备检查'?`<div class="child-modal-checklist">${['随身水壶','防晒用品','X学院营服','个人常用物品'].map((x,i)=>`<label><input type="checkbox" ${done||i<3?'checked':''}><span>${x}</span></label>`).join('')}</div>`:`<label class="form-field full"><span>我想对未来的自己说</span><textarea id="childTaskText" placeholder="例如：希望我遇到困难时，也愿意再试一次">${done?'希望我能勇敢表达，也认真听伙伴的想法。':''}</textarea></label>`}<div class="modal-actions"><button class="btn btn--outline" data-close-modal>稍后完成</button><button class="btn btn--primary" data-action="complete-child-task" data-task-name="${name}">${done?'保存修改':'完成任务'}</button></div>`);
}

function childLoginModal(){
  state.childLoggedIn=false; state.childLoginStage='main'; state.childPage='home'; renderChild(); showToast("已进入营员登录演示","从兴智教育登录页选择“营员登录”，再使用家庭邀请码绑定已有 student_id");
}

function renderCamp() {
  const people = ["周可乐","陈星野","张小满","林知夏","王予安"];
  const modeSwitch = () => `<div class="work-mode-switch" aria-label="工作场景切换"><button class="${state.campMode==='parent'?'is-active':''}" data-camp-mode="parent">父母成长服务</button><button class="${state.campMode==='college'?'is-active':''}" data-camp-mode="college">X学院</button></div>`;
  const staffHeader = (title="工作台", action="") => `<header class="staff-header"><div class="staff-identity"><span class="staff-avatar">毅</span><div><b>陈毅北</b><small>${state.campMode==='college'?'孩子指导师 · 向日葵2班':'督导 · 南昌组'}</small></div></div>${action}<h1>${title}</h1>${modeSwitch()}</header>`;
  const collegeWorkbench = () => `${staffHeader("X学院工作台",`<button class="staff-icon-button" data-camp-page="messages" aria-label="打开消息">▤<em>3</em></button>`)}<main class="staff-body">
    <button class="camp-context-card" data-action="switch-camp"><span><small>当前营期</small><b>新疆自然探索营 · 第1期</b><em>第1天 · 向日葵2班 · 12名营员</em></span><i>⌄</i></button>
    <section class="camp-metrics"><article><b>${state.checkedIn.size}</b><span>已签到</span></article><article><b>${12-state.checkedIn.size}</b><span>待到营</span></article><article class="risk"><b>2</b><span>重点关注</span></article></section>
    <section class="staff-section"><div class="section-heading"><div><small>08月03日 · 星期一</small><h2>今日待办</h2></div><button>查看全部</button></div>
      <button class="today-task task-primary" data-camp-page="checkin"><time>08:30</time><span><b>到营签到与健康复核</b><small>集合大厅 · 还差 ${12-state.checkedIn.size} 人</small></span><i>›</i></button>
      <button class="today-task"><time>10:00</time><span><b>破冰与团队契约</b><small>活动室A · 任务记录已创建</small></span><i>›</i></button>
      <button class="today-task task-warning" data-camp-page="people"><time>12:00</time><span><b>午餐与过敏提醒</b><small>2名营员有饮食注意事项</small></span><i>!</i></button>
    </section>
    <section class="staff-section"><div class="section-heading"><h2>快捷操作</h2></div><div class="staff-action-grid">
      <button data-camp-page="checkin"><i class="blue">✓</i><span>签到点名</span></button><button data-camp-page="records"><i class="purple">✎</i><span>成长记录</span></button><button data-camp-page="incident"><i class="red">!</i><span>异常上报</span></button><button data-action="camp-broadcast"><i class="green">◉</i><span>营地播报</span></button><button data-camp-page="messages"><i class="orange">群</i><span>班级群</span></button><button data-action="offline"><i class="gray">↻</i><span>离线同步</span></button>
    </div></section>
    <section class="attention-card"><div><span class="attention-icon">!</span><span><b>2项风险需要关注</b><small>坚果过敏、随身用药，仅向必要岗位展示</small></span></div><button data-camp-page="people">查看营员</button></section>
  </main>`;
  const parentWorkbench = () => `${staffHeader("父母成长服务")}
    <main class="staff-body parent-workbench"><section class="legacy-card"><h2>案例直播</h2><div class="staff-action-grid legacy-actions"><button><i class="blue">＋</i><span>创建直播</span></button><button><i class="purple">播</i><span>我的直播</span></button><button><i class="green">▶</i><span>观看直播</span></button><button><i class="indigo">↻</i><span>直播回放</span></button></div></section>
    <section class="legacy-card"><h2>工作管理</h2><div class="staff-action-grid legacy-actions"><button><i class="blue">✎</i><span>批改作业</span></button><button><i class="purple">⌕</i><span>课程教案</span></button><button><i class="blue">▣</i><span>学员报告</span></button></div></section>
    <section class="legacy-card"><h2>指导师培训</h2><div class="staff-action-grid legacy-actions"><button><i class="blue">➤</i><span>课前引导</span></button><button><i class="indigo">?</i><span>常见问题</span></button><button><i class="orange">▤</i><span>续报问题</span></button><button><i class="blue">⇄</i><span>随机模拟</span></button></div></section></main>`;
  const messagesPage = () => `${staffHeader("消息",`<button class="staff-text-button">群发</button>`)}<main class="staff-body message-body filter-${state.campMessageFilter}">
    <div class="message-filters"><button class="${state.campMessageFilter==='all'?'is-active':''}" data-camp-message-filter="all">全部</button><button class="${state.campMessageFilter==='parent'?'is-active':''}" data-camp-message-filter="parent">父母服务</button><button class="${state.campMessageFilter==='college'?'is-active':''}" data-camp-message-filter="college">X学院</button></div>
    <div class="message-shortcuts"><button><i class="purple">咨</i><span>个案咨询</span></button><button><i class="green">守</i><span>守护计划</span></button><button class="is-highlight" data-camp-message-filter="college"><i class="orange">营</i><span>营期通知</span><em>2</em></button></div>
    <section class="message-list">
      <button class="message-row college-message"><i class="message-avatar group">2班</i><span><b>新疆营·向日葵2班家长群<em>X学院</em></b><small>周营长：今日15:00统一发送到营播报</small></span><time>09:42<strong>2</strong></time></button>
      <button class="message-row college-message"><i class="message-avatar mentor">林</i><span><b>张小满妈妈<em>X学院</em></b><small>孩子防晒药膏已放在随身包侧袋</small></span><time>09:31</time></button>
      <button class="message-row parent-message"><i class="message-avatar parent">督</i><span><b>黄树诚（总督导）<em>父母服务</em></b><small>本周服务复盘已更新，请及时查看</small></span><time>昨天</time></button>
      <button class="message-row college-message"><i class="message-avatar system">系</i><span><b>X学院任务通知<em>X学院</em></b><small>林知夏健康复核尚未完成</small></span><time>08:45<strong>1</strong></time></button>
    </section></main>`;
  const peoplePage = () => state.campMode==='parent' ? `${staffHeader("我的学员")}<main class="staff-body"><section class="service-tools"><button><i>组</i><span>我的班组</span></button><button><i>话</i><span>通话记录与复盘</span></button><button><i>约</i><span>预约服务电话</span></button></section><div class="section-heading"><h2>学员通讯录</h2><small>15项总结待填写</small></div><div class="camper-list">${["曹惠琴","陈远宁","陈金群","陈秀英","蔡晓娜"].map(name=>`<button><i>${name.slice(-2)}</i><span><b>${name}</b><small>父母成长服务</small></span><em>›</em></button>`).join("")}</div></main>` : `${staffHeader("我的营员",`<button class="staff-icon-button" aria-label="搜索">⌕</button>`)}<main class="staff-body">
    <button class="roster-context"><span><small>新疆自然探索营 · 第1期</small><b>向日葵2班</b></span><i>⌄</i></button>
    <div class="roster-filters"><button class="is-active">全部 12</button><button>未签到 ${12-state.checkedIn.size}</button><button>重点关注 2</button><button>记录待补 4</button></div>
    <div class="section-heading"><div><small>按班级与状态管理</small><h2>营员名单</h2></div><span class="privacy-hint">必要可见</span></div>
    <div class="camper-list">${people.map((name,index)=>`<button data-camp-person="${name}"><i class="${index===2||index===3?'attention':''}">${name.slice(-2)}</i><span><b>${name}${index===2?'<em>用药提醒</em>':index===3?'<em>过敏关注</em>':''}</b><small>${state.checkedIn.has(name)?'已签到 · 资料齐全':'待签到 · '+(index===3?'健康复核待完成':'资料齐全')}</small></span><strong class="${state.checkedIn.has(name)?'done':''}">${state.checkedIn.has(name)?'已到营':'待到营'}</strong></button>`).join("")}</div></main>`;
  const profilePage = () => `${headerProfile()}<main class="staff-body profile-body"><section class="profile-card"><button><i class="blue">人</i><span><b>南昌组</b><small>所属组织</small></span><em>›</em></button><button><i class="orange">岗</i><span><b>双场景岗位</b><small>督导 · 孩子指导师</small></span><em>›</em></button></section><section class="profile-card"><button><i class="purple">营</i><span><b>当前营期权限</b><small>向日葵2班 · 至08月10日</small></span><em>›</em></button><button><i class="green">盾</i><span><b>隐私与查看记录</b><small>健康资料按需可见并留痕</small></span><em>›</em></button></section><section class="permission-note"><b>工作台边界</b><p>可执行营期任务、记录与沟通；不能修改合同、权益、预约审批和营期规则。</p></section></main>`;
  const tasksPage = () => {
    const tasks=[
      {time:"08:30",icon:"签",name:"到营签到与健康复核",meta:`日程任务 · 向日葵2班 · ${state.checkedIn.size}/12`,status:"进行中",owner:true,state:"pending",page:"checkin"},
      {time:"10:00",icon:"课",name:"破冰与团队契约",meta:"日程任务 · 上传小组契约",status:"待开始",owner:true,state:"pending",action:"camp-task-detail"},
      {time:"12:00",icon:"险",name:"午餐与过敏提醒",meta:"风险提醒 · 2名重点营员",status:"需关注",owner:true,state:"pending",page:"people",warning:true},
      {time:"20:30",icon:"记",name:"当日成长记录",meta:"系统生成 · 每人至少1条",status:"已完成",owner:true,state:"done",page:"records"},
      {time:"21:00",icon:"播",name:"家长端营地播报",meta:"业务节点 · 营期负责人已发布",status:"已完成",owner:false,state:"done",action:"camp-task-detail"}
    ];
    const visible=tasks.filter(task=>state.campTaskFilter==='today'||state.campTaskFilter==='mine'&&task.owner||state.campTaskFilter===task.state);
    const row=task=>`<article class="mobile-task-row ${task.warning?'warning':''} ${task.state==='done'?'done':''}" ${task.page?`data-camp-page="${task.page}"`:`data-action="${task.action}"`}><time>${task.time}</time><i>${task.icon}</i><span><b>${task.name}</b><small>${task.meta}</small></span><em>${task.status}</em></article>`;
    return `${staffHeader("全部任务")}<main class="staff-body task-center"><div class="task-filter-tabs"><button class="${state.campTaskFilter==='today'?'active':''}" data-camp-task-filter="today">今日 5</button><button class="${state.campTaskFilter==='mine'?'active':''}" data-camp-task-filter="mine">我的 4</button><button class="${state.campTaskFilter==='pending'?'active':''}" data-camp-task-filter="pending">待完成 3</button><button class="${state.campTaskFilter==='done'?'active':''}" data-camp-task-filter="done">已完成 2</button></div><section class="task-date-block"><div><small>08月03日 · 第1天</small><b>${state.campTaskFilter==='done'?'已完成任务':'营程任务'}</b></div>${visible.map(row).join('')}</section></main>`;
  };
  const checkinPage = () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>到营签到</h1><p>向日葵2班 · ${state.checkedIn.size}/12已到营</p></div><span>${state.checkedIn.size}/12</span></header><main class="staff-body checkin-body"><div class="checkin-tools"><button data-action="scan-checkin"><i>⌗</i><span><b>扫码签到</b><small>扫描营员签到码</small></span></button><button data-action="batch-checkin"><i>多</i><span><b>批量签到</b><small>仅处理无阻断营员</small></span></button><button class="warning" data-action="missing-arrival"><i>!</i><span><b>未到异常</b><small>延误或无法联系</small></span></button></div><div class="alert-strip">张小满：随身携带防晒药膏；林知夏：坚果过敏。仅向当前必要岗位展示。</div><div class="checkin-progress"><span><b>${state.checkedIn.size}</b><small>已签到</small></span><i><em style="--checkin:${Math.round(state.checkedIn.size/12*100)}%"></em></i><span><b>${12-state.checkedIn.size}</b><small>待到营</small></span></div><div class="student-list">${people.map(name=>`<article class="student-row"><span class="mini-avatar">${name[0]}</span><div><h3>${name}</h3><p>${name==='林知夏'?'健康复核待确认 · 坚果过敏':name==='张小满'?'交通：CZ6885 · 已到达':'资料齐全 · 无阻断项'}</p></div><button class="checkin-btn ${state.checkedIn.has(name)?'checked':''}" ${state.checkedIn.has(name)?'disabled':''} data-checkin="${name}">${state.checkedIn.has(name)?'已签到':'复核签到'}</button></article>`).join("")}</div><section class="checkin-log"><div class="section-heading"><h2>最近签到记录</h2><small>全部留痕</small></div><p><b>陈星野</b><span>陈毅北 · 手工签到</span><time>08:36</time></p><p><b>周可乐</b><span>扫码签到 · 已通知家长</span><time>08:31</time></p></section></main>`;
  function headerProfile(){ return `<header class="profile-hero"><span class="large-avatar">毅</span><div><h1>陈毅北 <em>♂</em></h1><p>账号：17682319718</p></div></header>${modeSwitch()}`; }
  const broadcastPage = () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>营地播报</h1><p>素材提交 · 营长审核 · 家长阅读</p></div><button class="staff-header-action" data-action="create-broadcast" data-broadcast-type="album">＋ 新建</button></header><main class="staff-body camp-broadcast-page"><section class="broadcast-mobile-summary"><div><small>今日播报</small><b>3 / 4</b><em>还差1次文字记录</em></div><span><small>家长阅读率</small><b>87%</b><em>26/30个家庭已读</em></span></section><div class="broadcast-mobile-types"><button data-action="create-broadcast" data-broadcast-type="album"><i>册</i><span>相册</span></button><button data-action="create-broadcast" data-broadcast-type="text"><i>文</i><span>文字</span></button><button data-action="create-broadcast" data-broadcast-type="video"><i>视</i><span>短视频</span></button><button data-action="create-broadcast" data-broadcast-type="live"><i>播</i><span>直播</span></button></div><section class="staff-section"><div class="section-heading"><div><small>10月1日 · 第1天</small><h2>播报时间轴</h2></div><button data-action="preview-broadcast-list">全部记录</button></div><article class="broadcast-mobile-card published"><div><span class="tag green">已发布</span><time>21:00</time></div><h3>第1天 · 我们顺利抵达营地</h3><p>相册12张 · 全营家长 · 已读26个家庭</p><footer><span>李航审核</span><button>查看家长端</button></footer></article><article class="broadcast-mobile-card review"><div><span class="tag amber">待审核</span><time>18:30</time></div><h3>破冰任务完成情况</h3><p>文字播报 · 向日葵1班 · 陈毅北提交</p><footer><span>等待营长审核</span><button>查看草稿</button></footer></article><article class="broadcast-mobile-card draft"><div><span class="tag">草稿</span><time>15:10</time></div><h3>团队契约精华视频</h3><p>短视频 01:26 · 摄影师素材</p><footer><span>素材处理中</span><button>继续编辑</button></footer></article></section><section class="broadcast-mobile-rule"><b>播报不是普通群消息</b><p>正式播报需要审核并保留发布记录；班级群仅接收提醒和互动，不能替代播报时间轴。</p></section></main>`;
  const postCampReportPage = () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>营后报告</h1><p>成长记录汇总与指导师确认</p></div></header><main class="staff-body camp-report-page"><section class="mobile-report-progress"><span><small>个人报告完成度</small><b>24 / 29</b><em>5份待补充结营测评或评语</em></span><strong>83%</strong></section><div class="report-mobile-checklist"><article class="done"><i>✓</i><span><b>营期行为记录</b><small>186条 · 已全部关联营员</small></span></article><article class="warning"><i>!</i><span><b>结营六维测评</b><small>24/29 · 还差5人</small></span></article><article class="done"><i>✓</i><span><b>徽章授予</b><small>47枚 · 已完成复核</small></span></article><article class="warning"><i>!</i><span><b>指导师评语</b><small>26/29 · 还差3人</small></span></article></div><section class="staff-section"><div class="section-heading"><h2>待我确认</h2><small>3份</small></div><button class="report-mobile-person" data-action="preview-camp-report"><span class="mini-avatar">张</span><span><b>张小满</b><small>报告已生成 · 待确认评语</small></span><em>›</em></button><button class="report-mobile-person"><span class="mini-avatar">周</span><span><b>周可乐</b><small>缺少结营六维测评</small></span><em>›</em></button><button class="report-mobile-person"><span class="mini-avatar">陈</span><span><b>陈星野</b><small>待选择报告精选照片</small></span><em>›</em></button></section></main>`;
  const pages = {
    workbench: () => state.campMode==='college'?collegeWorkbench():parentWorkbench(),
    messages: messagesPage,
    people: peoplePage,
    profile: profilePage,
    ai: () => `${staffHeader("人工智能助手")}<main class="staff-body ai-workbench"><div class="ai-orb">AI</div><h2>${state.campMode==='college'?'今天需要我协助什么？':'为父母成长服务提供工作辅助'}</h2><p>${state.campMode==='college'?'我可以整理营期记录、生成日报草稿和检查资料缺失，但不会代替人工处理医疗与安全判断。':'我可以帮助整理沟通纪要、服务总结与课程资料。'}</p><div class="ai-prompts"><button>整理今日营期记录</button><button>生成家长播报草稿</button><button>检查待补资料</button></div></main>`,
    checkin: () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>到营签到</h1><p>向日葵2班 · ${state.checkedIn.size}/12已到营</p></div><span>${state.checkedIn.size}/12</span></header><main class="staff-body"><div class="alert-strip">张小满：随身携带防晒药膏；林知夏：坚果过敏。仅向当前必要岗位展示。</div><div class="student-list">${people.map(name=>`<article class="student-row"><span class="mini-avatar">${name[0]}</span><div><h3>${name}</h3><p>${name==='张小满'?'交通：CZ6885 · 已到达':'资料齐全 · 无阻断项'}</p></div><button class="checkin-btn ${state.checkedIn.has(name)?'checked':''}" data-checkin="${name}">${state.checkedIn.has(name)?'已签到':'签到'}</button></article>`).join("")}</div></main>`,
    tasks: tasksPage,
    checkin: checkinPage,
    records: () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>成长记录</h1><p>记录可验证的真实行为</p></div></header><main class="staff-body form-body"><div class="form-field"><label>选择营员</label><select><option>张小满</option><option>周可乐</option><option>陈星野</option></select></div><div class="form-field"><label>行为标签</label><div class="switch-options"><label class="option-card"><input type="checkbox" checked>主动沟通</label><label class="option-card"><input type="checkbox">团队协作</label><label class="option-card"><input type="checkbox">坚持完成</label><label class="option-card"><input type="checkbox">问题解决</label></div></div><div class="form-field"><label>观察记录</label><textarea>在破冰任务中主动邀请两位不熟悉的同伴加入讨论，并帮助团队明确分工。</textarea></div><div class="upload-placeholder">＋ 添加照片或作品</div><button class="staff-primary-button" data-action="save-growth">保存成长记录</button></main>`,
    broadcast: broadcastPage,
    reports: postCampReportPage,
    incident: () => `<header class="detail-header"><button data-camp-page="workbench">‹</button><div><h1>异常上报</h1><p>分级通知、跟踪处理、复核关闭</p></div></header><main class="staff-body"><div class="incident-grid"><button data-incident="健康"><i>✚</i><b>健康</b><small>不适 · 用药 · 就医</small></button><button data-incident="安全"><i>!</i><b>安全</b><small>受伤 · 风险 · 走失</small></button><button data-incident="行为"><i>人</i><b>行为</b><small>冲突 · 情绪 · 纪律</small></button><button data-incident="交通住宿"><i>⌂</i><b>交通住宿</b><small>延误 · 房间 · 物品</small></button></div><div class="section-heading"><h2>处理中</h2></div><article class="processing-incident"><em>P2</em><span><b>营员轻微腹痛</b><small>医疗老师已接手 · 等待复核关闭</small></span><time>18分钟</time></article></main>`,
  };
  $("#campScreen").innerHTML = (pages[state.campPage]||pages.workbench)();
  if(state.campPage==='workbench'&&state.campMode==='college') {
    const allTasksButton=$("#campScreen .staff-section .section-heading button");
    if(allTasksButton) allTasksButton.dataset.campPage='tasks';
    const todayTasks=$$("#campScreen .today-task");
    if(todayTasks[1]) todayTasks[1].dataset.action='camp-task-detail';
    const actionGrid=$("#campScreen .staff-action-grid");
    if(actionGrid&&!actionGrid.querySelector('[data-camp-page="reports"]')) actionGrid.insertAdjacentHTML("beforeend",'<button data-camp-page="reports"><i class="indigo">报</i><span>营后报告</span></button>');
  }
  const primaryPage = ["tasks","checkin","records","incident","broadcast","reports"].includes(state.campPage)?"workbench":state.campPage;
  $$('.workbench-tabs [data-camp-page]').forEach((el)=>el.classList.toggle("is-active",el.dataset.campPage===primaryPage));
  $$('.camp-review-aside [data-camp-page]').forEach((el)=>el.classList.toggle("is-active",el.dataset.campPage===primaryPage));
  const peopleLabel=$('.workbench-tabs [data-camp-page="people"] span');
  if(peopleLabel) peopleLabel.textContent=state.campMode==='college'?'我的营员':'我的学员';
}

function incidentModal(type) {
  openModal(`<span class="eyebrow">营中异常 · ${type}</span><h2>创建异常事件</h2><p class="modal-lead">提交后按等级通知营长、医疗或主管，并记录责任人、处理时限、家长沟通与复核关闭。</p><div class="form-grid"><div class="form-field"><label>涉及营员</label><select><option>张小满</option><option>周可乐</option></select></div><div class="form-field"><label>事件等级</label><select><option>P3 一般</option><option>P2 重要</option><option>P1 紧急</option></select></div><div class="form-field full"><label>现场情况</label><textarea placeholder="请描述时间、地点、表现与已采取措施"></textarea></div><div class="form-field full"><label>现场照片 / 证明</label><input type="file" multiple></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>保存草稿</button><button class="btn btn--danger" data-submit-incident>立即上报</button></div>`);
}

let tourIndex = 0;
let tourActive = false;

function tourResetLayers() {
  if (!$("#modalBackdrop").hidden) closeModal();
  if (!$("#drawerBackdrop").hidden) closeDrawer();
}

const tourSteps = [
  {
    system:"业务总览", title:"从一条可追溯的履约链路开始", selector:".overview-hero",
    text:"这条链路以父母账号服务资格为入口，以 student_id 为孩子长期成长主档，串联销售、预约、营期履约和成长沉淀。",
    result:"本步结果：明确四套系统的职责边界与共同业务对象。",
    enter(){ tourResetLayers(); switchSystem("overview"); }
  },
  {
    system:"SCRM", title:"先定义可售课包与不单卖子产品", selector:".scrm-flow-banner",
    text:"课包负责商业价格、次数和有效期；子产品不可单卖，只限定订单成交后可使用的 X学院课程范围。",
    result:"本步结果：销售商品和实际课程范围形成稳定映射。",
    enter(){ tourResetLayers(); switchSystem("scrm"); state.scrmPage="products"; renderSCRM(); }
  },
  {
    system:"SCRM", title:"创建订单时固化课包与子产品组合", selector:".scrm-order-note",
    text:"销售先选一个课包，再从该课包允许范围中勾选一个或多个子产品，订单保存成交组合快照。",
    result:"本步结果：后续资格次数和可预约课程都有明确来源。",
    enter(){ tourResetLayers(); switchSystem("scrm"); state.scrmPage="orders"; renderSCRM(); }
  },
  {
    system:"SCRM", title:"合同登记父母与候选孩子", selector:".scrm-order-detail",
    text:"电子合同归档父母账号、合同孩子和签署版本。合同孩子只是未来预约的候选对象，不代表已经报名任何营期。",
    result:"本步结果：合同与身份信息可同步，但不会提前占用营位。",
    enter(){ tourResetLayers(); switchSystem("scrm"); state.scrmPage="orders"; state.scrmOrderTab="contract"; renderSCRM(); openScrmOrderDrawer(); }
  },
  {
    system:"传承后台", title:"X学院订单进入独立待开通队列", selector:".xcollege-context-strip",
    text:"原父母课程订单继续进入阶段、班级和督导分配；X学院订单只开通父母账号服务资格，不进入常规班级。",
    result:"本步结果：复用统一订单入口，同时保持两类履约模型互不混用。",
    enter(){ tourResetLayers(); switchSystem("ops"); state.opsPage="xorders"; renderOps(); }
  },
  {
    system:"传承后台", title:"开通父母账号的 X学院服务资格", selector:".qualification-summary",
    text:"运营确认订单、合同、父母账号和孩子身份后开通资格。课包决定次数与有效期，子产品决定课程范围。",
    result:"本步结果：父母获得 5 次资格；孩子和具体营期仍需预约时选择。",
    enter(){ tourResetLayers(); switchSystem("ops"); state.opsPage="xorders"; renderOps(); openXOrderDrawer(); }
  },
  {
    system:"传承后台", title:"课程定义内容，营期承载一次履约", selector:".product-summary",
    text:"课程配置适龄、成长价值、家长端详情和默认预约规则；同一课程可以创建多个不同时间地点的营期。",
    result:"本步结果：课程内容复用，具体日期、地点、容量不被重复维护。",
    enter(){ tourResetLayers(); switchSystem("ops"); state.opsPage="courses"; renderOps(); }
  },
  {
    system:"传承后台", title:"营期配置团队、分组、任务与专属页面", selector:".itinerary-task-list",
    text:"每个营期独立配置负责人和老师、自动分组规则、每日营程任务、开营通知及行前页面。",
    result:"本步结果：发布营期后，任务按日期、班组和责任岗位生成实例。",
    enter(){ tourResetLayers(); switchSystem("ops"); state.opsPage="dashboard"; state.selectedSession=0; state.sessionConfigTab="itinerary"; renderOps(); sessionConfigDrawer(0); }
  },
  {
    system:"兴智应用", title:"父母账号有资格后进入 X学院内容", selector:".member-benefit-hero",
    text:"首页保留“家庭成长树”，新增“X学院”内容 Tab。父母资格不随孩子切换，预约和成长数据按当前孩子重新计算。",
    result:"本步结果：同一个父母账号可在合同孩子之间切换服务对象。",
    enter(){ tourResetLayers(); switchSystem("parent"); state.parentHasCollegeEntitlement=true; state.inCollege=false; state.appTab="heritage"; state.homeTab="college"; state.child="张小满"; renderParent(); }
  },
  {
    system:"兴智应用", title:"所有预约待办回到具体课程处理", selector:".reservation-next-hero",
    text:"父母在我的行程查看聚合状态，参营确认、交通健康资料、改期和取消都回到对应课程与营期完成。",
    result:"本步结果：预约通过后冻结 1 次资格并预占 1 个营位。",
    enter(){ tourResetLayers(); switchSystem("parent"); state.inCollege=true; state.appTab="heritage"; state.parentPage="reservations"; renderParent(); }
  },
  {
    system:"兴智 IM", title:"正式通知、班级群和指导师统一进入消息", selector:".im-filter-tabs",
    text:"预约、资料、开营、候补、审批和成长报告进入站内信；班级群承担沟通，但不替代正式业务状态。",
    result:"本步结果：父母课程指导师与孩子指导师按服务关系清晰区分。",
    enter(){ tourResetLayers(); switchSystem("parent"); state.inCollege=false; state.appTab="messages"; state.activeChat=null; state.messageFilter="college"; renderParent(); }
  },
  {
    system:"传承后台", title:"锁定名单并固化自动分组快照", selector:".roster-lock-banner, .roster-prelock-banner",
    text:"运营查看报名、资料和风险，按人数、师生比、重点关注、年龄及同行关系生成分组；锁定后变更必须走审批。",
    result:"本步结果：正式名单、班组和指导师关系同步营地执行端。",
    enter(){ tourResetLayers(); switchSystem("ops"); state.opsPage="sessionRoster"; state.selectedSession=3; renderOps(); }
  },
  {
    system:"兴智工作台", title:"孩子指导师按岗位接收每日任务", selector:".task-filter-tabs",
    text:"复用现有兴智工作台，支持今日、我的、待完成和已完成任务；无 X学院岗位的员工不会看到该场景。",
    result:"本步结果：每项任务都有时间、地点、完成条件、提醒和升级责任人。",
    enter(){ tourResetLayers(); switchSystem("camp"); state.campMode="college"; state.campPage="tasks"; state.campTaskFilter="today"; renderCamp(); }
  },
  {
    system:"兴智工作台", title:"签到前复核名单、资格和健康阻断", selector:".checkin-tools",
    text:"手工、扫码和批量签到执行同一套校验。健康风险营员不能被批量跳过复核，未到营可登记异常。",
    result:"本步结果：签到成功后冻结次数正式核销，并向父母发送结果通知。",
    enter(){ tourResetLayers(); switchSystem("camp"); state.campMode="college"; state.campPage="checkin"; renderCamp(); }
  },
  {
    system:"兴智应用", title:"营地证据最终沉淀为孩子成长档案", selector:".growth-profile-hero",
    text:"成长记录、营期报告和能力足迹永久归属原 student_id；换营员、改期或合同变化都不会迁移或覆盖历史。",
    result:"全流程完成：销售事实、履约事实与成长事实均可追溯。",
    enter(){ tourResetLayers(); switchSystem("parent"); state.inCollege=true; state.appTab="heritage"; state.parentPage="growth"; state.child="张小满"; renderParent(); }
  }
];

const tourStepDetails = {
  "从一条可追溯的履约链路开始": {page:"评审总览",role:"产品、研发、测试、业务负责人",normal:"按对象边界理解课包、资格、孩子、课程、营期和预约。",exception:"任何系统失败均不能覆盖上游业务事实，失败事件进入重试或人工处理。",innovation:"由页面集合升级为可跨系统追踪的业务对象链路。"},
  "先定义可售课包与不单卖子产品": {page:"SCRM / 产品列表",role:"销售运营",normal:"课包上架销售，子产品只能随关联课包选择。",exception:"未关联课包、已下架或未映射课程的子产品不可进入成交组合。",innovation:"用两层商品模型同时满足销售定价与营地课程范围。"},
  "创建订单时固化课包与子产品组合": {page:"SCRM / 订单列表、创建订单",role:"销售、销售运营",normal:"先选课包，再选择允许关联的子产品并保存快照。",exception:"越权子产品、空组合或下架课包阻断提交；重复提交不得生成重复订单。",innovation:"订单不再只记录一个课程名称，而是保存商业课包与履约范围。"},
  "合同登记父母与候选孩子": {page:"SCRM / 订单详情、电子合同",role:"销售、合同运营",normal:"合同归档父母、合同孩子、签署版本和服务内容。",exception:"证件重复、监护关系冲突、未归档合同进入人工处理，不能自动开通。",innovation:"合同孩子只作为候选服务对象，避免签约即误判为报名。"},
  "X学院订单进入独立待开通队列": {page:"传承后台 / X学院待开通订单",role:"录单人员、X学院运营",normal:"X学院订单开通资格，父母成长课程订单继续原分班流程。",exception:"订单未结清、合同缺失、父母账号或孩子匹配失败时阻断。",innovation:"复用统一订单入口，但在后台按业务域路由。"},
  "开通父母账号的 X学院服务资格": {page:"传承后台 / 待开通详情",role:"X学院运营",normal:"校验通过后生成次数、有效期和课程范围。",exception:"重复同步保持幂等；身份冲突进入人工处理；开通不自动占营位。",innovation:"资格归属父母账号，孩子只在预约具体营期时选择。"},
  "课程定义内容，营期承载一次履约": {page:"传承后台 / X学院课程",role:"课程运营、教研",normal:"课程统一维护内容和默认规则，营期复用课程创建。",exception:"详情内容不完整不能发布；规则变更不覆盖历史预约快照。",innovation:"内容产品与履约批次解耦，减少重复配置。"},
  "营期配置团队、分组、任务与专属页面": {page:"传承后台 / 营期配置",role:"营期负责人",normal:"配置团队、分组、任务、开营通知和行前页面后发布。",exception:"负责人或必要岗位缺失、任务无责任人、硬规则冲突时阻断发布。",innovation:"把营期执行从临时表格升级为可配置、可分发、可追踪的任务体系。"},
  "父母账号有资格后进入 X学院内容": {page:"兴智 App / 传承首页 X学院 Tab",role:"父母",normal:"有资格展示次数、孩子、待办和推荐课程。",exception:"无资格展示品牌介绍与咨询入口；资格过期或用完时不可发起正式预约。",innovation:"保留原家庭成长树，通过顶部双 Tab 融合孩子课程。"},
  "所有预约待办回到具体课程处理": {page:"兴智 App / 我的行程、课程详情",role:"父母",normal:"聚合查看行程，回到具体课程完成确认、资料和变更。",exception:"年龄、时间、资格、有效期或营位任一失败均不得部分冻结资源。",innovation:"一个课程承载一个完整履约上下文，避免聚合页堆叠所有操作。"},
  "正式通知、班级群和指导师统一进入消息": {page:"兴智 App / 消息、通讯录",role:"父母、孩子指导师、父母指导师",normal:"系统通知、孩子指导师、班级群和父母指导师按关系分组。",exception:"群聊不替代正式状态；过期服务关系不可继续访问营期敏感内容。",innovation:"复用兴智 IM，同时清楚区分父母成长服务与孩子营地服务。"},
  "锁定名单并固化自动分组快照": {page:"传承后台 / 营期报名与分组",role:"X学院运营、营期负责人",normal:"处理资料阻断后生成分组预览并锁定名单。",exception:"硬规则冲突阻断锁定；锁定后换班、取消、改期和换营员必须审批。",innovation:"报名结构、资料、风险、分组和历史版本集中在一个页面。"},
  "孩子指导师按岗位接收每日任务": {page:"兴智工作台 / 全部任务",role:"孩子指导师",normal:"按今日、我的、待完成、已完成查看责任任务。",exception:"超时任务升级负责人；临时风险可追加任务但不覆盖原模板。",innovation:"从功能宫格升级为由营期日程驱动的工作流。"},
  "签到前复核名单、资格和健康阻断": {page:"兴智工作台 / 到营签到",role:"孩子指导师",normal:"支持手工、扫码和批量签到，成功后核销资格。",exception:"不在锁定名单、参营状态无效或健康阻断时禁止签到；未到营登记异常。",innovation:"签到不再只是按钮，而是身份、资格、健康和通知的业务节点。"},
  "营地证据最终沉淀为孩子成长档案": {page:"兴智 App / 成长档案",role:"父母、教研、孩子指导师",normal:"营期成长证据经审核后进入 student_id 长期档案。",exception:"换营员、合同终止或改期不迁移、不删除原孩子历史。",innovation:"把一次营地活动变成跨课程持续累积的成长时间线。"}
};

tourSteps.splice(tourSteps.length-1,0,
  {system:"兴智应用",title:"行前六维测评建立开营成长基线",selector:".pre-assessment-form",text:"父母在参营确认后协助孩子完成六个维度的五级观察量表，建议名单锁定前完成；开营时固化为本期成长基线。",result:"本步结果：测评不影响资格、营位和签到，只为营后前后对比提供基线。",page:"兴智 App / 我的本期·行前准备",role:"父母、孩子",normal:"六个维度均可直接选择1—5级，并可补充近期观察。",exception:"未完成时在报名名单展示待完成；营后不得回填或覆盖开营时基线。",innovation:"把成长评估前移到行前准备，并从下拉框升级为可见五级量表。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.selectedCourse="desert";state.sessionDemo=null;state.preAssessmentComplete=false;state.inCollege=true;state.parentPage="courseDetail";renderParent();preCampAssessmentModal();}},
  {system:"传承后台",title:"锁定前后采用两套调班路径",selector:".group-change-route",text:"名单锁定前可调整分组预览；名单锁定后不能覆盖正式班级，必须提交调班审批并生成新分组版本。",result:"本步结果：目标班容量、师生比、助教配置、班级群和任务影响均在提交前可见。",page:"传承后台 / 营期报名与分组",role:"营期负责人、X学院运营、审批人",normal:"锁定前选择目标班后直接更新预览，目标班自动排除当前班。",exception:"锁定后转审批，原分组快照保持不变；校验不通过时禁止提交。",innovation:"调班从静态按钮升级为分阶段、可校验、可追溯的完整交互。",enter(){tourResetLayers();switchSystem("ops");state.selectedSession=0;state.opsPage="sessionRoster";renderOps();manualGroupModal(0);}},
  {system:"传承后台",title:"营后报告进入独立营后管理阶段",selector:".post-camp-page",text:"营期结束后统一汇总行前基线、营中证据、结营测评和指导师评语，再生成个人报告与班级报告。",result:"本步结果：营期配置只负责开营前与营中配置，营后报告不再混在编辑抽屉中。",page:"传承后台 / 营后管理",role:"X学院运营、孩子指导师、营期负责人",normal:"查看数据准备度、待补项、报告生成、审核和推送状态。",exception:"缺少结营测评、评语或证据审核时报告保持待确认；行前基线只读。",innovation:"将报告从配置项升级为独立、可跟踪的营后业务流程。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="postCamp";renderOps();}}
);

const appTourSteps = [
  {system:"兴智 App 革新",title:"首页保持原内容，同时新增业务切换",selector:".home-segmented-tabs",page:"传承首页",role:"全部父母用户",normal:"默认保留家庭成长树，点击 X学院切换孩子课程内容。",exception:"父母账号没有资格时仍可进入介绍页，但不能预约。",innovation:"不新增独立 App，不改变原底部主导航。",enter(){tourResetLayers();switchSystem("parent");state.inCollege=false;state.appTab="heritage";state.homeTab="tree";renderParent();}},
  {system:"兴智 App 革新",title:"无资格父母看到品牌介绍与咨询",selector:".college-intro-hero",page:"X学院发现页",role:"无有效资格的父母",normal:"浏览课程价值、精选课程并联系指导师。",exception:"不得展示伪造次数、预约入口或孩子已报名状态。",innovation:"将无资格状态从空白页改为内容发现和咨询转化页。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=false;state.inCollege=false;state.appTab="heritage";state.homeTab="college";renderParent();}},
  {system:"兴智 App 革新",title:"有资格父母进入会员式任务首页",selector:".member-benefit-hero",page:"X学院会员首页",role:"有有效资格的父母",normal:"展示资格有效期、剩余次数、当前孩子和最近待办。",exception:"资格失效、次数用完或同步中需展示明确原因与下一步。",innovation:"从课程入口升级为围绕“孩子下一步要做什么”的业务首页。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.inCollege=false;state.appTab="heritage";state.homeTab="college";state.child="张小满";renderParent();}},
  {system:"兴智 App 革新",title:"父母资格与孩子服务对象分离",selector:".member-child-row",page:"X学院会员首页 / 孩子切换",role:"多孩子家庭",normal:"切换孩子后重算适龄、冲突、预约、资料和成长数据。",exception:"孩子不在合同候选范围、身份未匹配或监护授权失效时不可选择。",innovation:"资格归父母账号，避免把孩子切换误解为权益转移。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.inCollege=false;state.appTab="heritage";state.homeTab="college";renderParent();}},
  {system:"兴智 App 革新",title:"课程可浏览，能否预约由资格决定",selector:".course-catalog-section",page:"探索课程",role:"父母",normal:"资格内课程可进入预约，其他课程仍可查看与咨询。",exception:"不在资格范围的课程不得冻结次数或占营位。",innovation:"把内容发现与交易资格解耦，避免无资格用户看不到课程。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.inCollege=true;state.appTab="heritage";state.parentPage="courses";renderParent();}},
  {system:"兴智 App 革新",title:"课程详情同时承载内容与我的本期",selector:".my-course-session",page:"课程详情 / 我的本期",role:"父母",normal:"同一页面查看课程价值、当前营期状态、资料和指导师关系。",exception:"候补显示倒计时；名单锁定后资料和人员变更转审批；已完成展示报告。",innovation:"用具体课程作为预约、履约和成长的统一上下文。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.selectedCourse="desert";state.sessionDemo=null;state.inCollege=true;state.parentPage="courseDetail";renderParent();}},
  {system:"兴智 App 革新",title:"行程与资料变成结构化完成清单",selector:".trip-materials-card",page:"课程详情 / 行程与资料",role:"父母、营期执行人员",normal:"分别维护交通、健康、接送和协议，并显示完成状态。",exception:"名单锁定后只读，变更通过资料申请进入运营审核。",innovation:"替代散落在群聊和表单中的行前信息，形成可校验状态。",enter(){tourResetLayers();switchSystem("parent");state.selectedCourse="desert";state.sessionDemo="locked";state.inCollege=true;state.parentPage="courseDetail";renderParent();}},
  {system:"兴智 App 革新",title:"消息按父母服务、X学院和孩子过滤",selector:".im-filter-tabs",page:"消息",role:"父母",normal:"系统通知、孩子指导师、父母指导师和班级群共用 IM。",exception:"群聊消息不改变正式预约状态，点击失效通知需展示当前状态。",innovation:"在原 IM 上增加业务标签和服务对象过滤，而非另建消息中心。",enter(){tourResetLayers();switchSystem("parent");state.inCollege=false;state.appTab="messages";state.activeChat=null;state.messageFilter="all";renderParent();}},
  {system:"兴智 App 革新",title:"通讯录按服务关系而不是姓名混排",selector:".relationship-card--college",page:"通讯录",role:"父母",normal:"区分父母成长指导师、孩子指导师、班级群和当前孩子。",exception:"孩子无进行中课程时不显示指导师服务中，过期班级群进入归档。",innovation:"联系人带有角色、孩子和营期语境，减少沟通对象混淆。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.inCollege=false;state.appTab="contacts";renderParent();}},
  {system:"兴智 App 革新",title:"顶部冗余功能下沉到“我”",selector:".profile-tools",page:"我",role:"全部登录用户",normal:"站内信和扫码作为工具入口放入个人页。",exception:"无权限二维码需明确提示，不得跳过业务校验。",innovation:"首页顶部只保留业务主任务，减少名称、站内信和扫码造成的视觉拥挤。",enter(){tourResetLayers();switchSystem("parent");state.inCollege=false;state.appTab="profile";renderParent();}},
  {system:"兴智 App 革新",title:"家长在“我”中为孩子开通独立使用空间",selector:".child-access-entry",page:"我 / 孩子端管理",role:"监护人",normal:"选择合同中已匹配的孩子，确认后生成家庭邀请码并绑定原 student_id。",exception:"监护关系失效、孩子身份未匹配或重复账号时禁止开通；开通不转移合同与预约权限。",innovation:"把孩子端开通入口放在家长账号管理场景，并完整展示开通前、开通后与首次登录链路。",enter(){tourResetLayers();switchSystem("parent");state.inCollege=false;state.appTab="profile";renderParent();}},
  {system:"兴智 App 革新",title:"成长档案连接多次课程经历",selector:".growth-profile-hero",page:"成长档案",role:"父母、孩子",normal:"按 student_id 展示能力足迹、证据和跨课程时间线。",exception:"换营员不迁移历史，未审核证据不进入正式报告。",innovation:"从一次课程报告升级为长期成长主档。",enter(){tourResetLayers();switchSystem("parent");state.inCollege=true;state.appTab="heritage";state.parentPage="growth";renderParent();}},
  {system:"兴智 App 革新",title:"六维数据明细在手机宽度内完整呈现",selector:"#parentScreen .growth-radar-detail",page:"成长档案 / 六维数据明细",role:"父母、孩子指导师",normal:"雷达图下方展示六个维度的营前值、营后值和变化量，可切换不同营期查看。",exception:"数据缺失时标记待补全，不允许用零值代替；明细不得横向溢出或被手机框裁切。",innovation:"按组件容器而不是桌面窗口宽度响应，确保手机原型中的数据面板完整可读。",enter(){tourResetLayers();switchSystem("parent");state.growthSessionIndex=2;state.inCollege=true;state.appTab="heritage";state.parentPage="growth";renderParent();}}
];

appTourSteps.splice(7,0,
  {system:"兴智 App 革新",title:"行前六维测评用五级量表建立成长基线",selector:".pre-assessment-form",page:"课程详情 / 行前准备",role:"父母、孩子",normal:"参营确认后完成六个维度评分和父母补充观察，提交后行前准备更新为5/5。",exception:"测评不用于筛选或拒绝参营；开营固化后，营后只能读取对应版本。",innovation:"成长评估从营后补录前移为真实的行前观察，并采用一屏可见的五级评分。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.selectedCourse="desert";state.sessionDemo=null;state.preAssessmentComplete=false;state.inCollege=true;state.parentPage="courseDetail";renderParent();preCampAssessmentModal();}}
);

const childTourSteps = [
  {system:"兴智 App · 营员端",title:"家长授权后绑定已有成长主档",selector:".child-login-screen",page:"营员登录与绑定",role:"营员、监护人",normal:"营员使用家庭邀请码登录，并绑定合同中已存在的 student_id。",exception:"邀请码失效、监护授权撤回或 student_id 不匹配时禁止登录，不能新建重复成长档案。",innovation:"营员拥有独立使用空间，但身份与数据仍受家长监护关系约束。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=false;state.childLoginStage="invite";state.childPage="home";renderChild();}},
  {system:"兴智 App · 孩子端",title:"孩子首页复用后台配置的课程主视觉",selector:".child-camp-hero--linked",page:"孩子首页",role:"已授权孩子",normal:"课程名称与封面从后台课程母版读取，并与家长端课程列表、详情保持一致。",exception:"后台未配置封面时使用课程默认图；没有进行中营期时不展示购买或预约按钮。",innovation:"课程内容不再由孩子端单独维护，避免三个端出现不同封面和名称。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childConversation=null;state.childPage="home";renderChild();}},
  {system:"兴智 App · 孩子端",title:"营期计划转化为孩子今日任务",selector:".child-task-summary",page:"今日任务",role:"孩子、孩子指导师",normal:"完成装备检查、成长书写和营期互动，记录自动回到成长档案。",exception:"未到开放时间的任务不可进入；健康、交通和预约事项仍由父母处理。",innovation:"孩子参与履约，但不会误触父母账号的合同和资源操作。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childPage="tasks";renderChild();}},
  {system:"兴智 App · 孩子端",title:"六维测评由孩子完成自我观察",selector:".child-assessment-intro",page:"六维测评",role:"孩子",normal:"六个维度逐项选择五级量表，提交后形成本期营前成长基线。",exception:"缺少任一维度时阻止提交；结果不影响资格、分班、营位和签到。",innovation:"父母观察与孩子自评可以形成双视角，营后用于前后变化对比。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childAssessmentDone=false;state.childPage="assessment";renderChild();}},
  {system:"兴智 App · 孩子端",title:"消息限定在当前服务关系内",selector:".child-message-safety",page:"受控消息列表",role:"孩子、孩子指导师、当前班级",normal:"查看指导师会话、当前班级群和系统任务通知，家长可查看记录。",exception:"不能添加陌生好友、加入非营期群或回复系统通知；敏感信息发送前持续提醒。",innovation:"复用兴智 IM，同时为未成年人增加关系范围和监护安全边界。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childConversation=null;state.childMessageFilter="all";state.childPage="messages";renderChild();}},
  {system:"兴智 App · 孩子端",title:"消息会话在手机原型框内继续",selector:".child-conversation-page",page:"手机内会话页",role:"孩子、孩子指导师、当前班级",normal:"从消息列表进入指导师或班级会话，返回后保留消息列表上下文。",exception:"系统通知输入区禁用；会话打开时不出现全局侧边抽屉，也不显示底部主导航。",innovation:"二级页面遵循真实 App 页面栈，不再使用后台式侧边弹窗。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childPage="messages";state.childConversation="mentor";renderChild();}},
  {system:"兴智 App · 孩子端",title:"三个端复用同一套六维图和数据",selector:".child-linked-growth",page:"我的成长",role:"孩子、父母、指导师、后台人员",normal:"按同一 student_id 展示上期结营、本期营前和本期营后的六维变化。",exception:"未审核证据不进入正式报告；换营员或账号变更不迁移历史。",innovation:"孩子端不再绘制简化六边形，直接复用家长端与后台的六维组件和历史数据。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childConversation=null;state.childPage="growth";renderChild();}},
  {system:"兴智 App · 孩子端",title:"我的页面只保留孩子真正需要的内容",selector:".child-me-hero",page:"孩子端 / 我的",role:"已授权孩子",normal:"查看成长证据、徽章、任务和陪伴自己的指导师。",exception:"合同、资格、预约、健康资料和授权开关不进入孩子端个人页面。",innovation:"从权限控制面板重构为面向孩子的成长个人空间。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childConversation=null;state.childPage="profile";renderChild();}}
];

const childAccessTourSteps = [
  {system:"家长端 · 孩子账号",title:"孩子端入口位于家长端“我”页面",selector:".child-access-entry",page:"家长端 / 我 / 孩子端管理",role:"监护人",normal:"家长查看合同中已匹配的孩子及其开通状态，选择需要开通孩子端的孩子。",exception:"没有合同孩子、身份匹配失败或监护关系失效时显示原因，不允许生成账号。",innovation:"孩子端不是默认自动创建，而是由监护人在明确的账号管理入口主动开通。",enter(){tourResetLayers();switchSystem("parent");state.childAccountEnabled=false;state.inCollege=false;state.appTab="profile";renderParent();}},
  {system:"家长端 · 孩子账号",title:"开通前明确能力范围与家长权限边界",selector:".child-access-confirm",page:"孩子端管理 / 开通确认",role:"监护人",normal:"确认开通对象、原 student_id 和孩子可使用的任务、测评、消息、成长能力。",exception:"未勾选监护确认时禁止提交；合同、资格、预约和健康资料不会下放给孩子。",innovation:"开通不是一个无说明开关，而是一次可理解、可确认的监护授权。",enter(){tourResetLayers();switchSystem("parent");state.childAccountEnabled=false;state.inCollege=false;state.appTab="profile";renderParent();childAccountManageModal();}},
  {system:"家长端 · 孩子账号",title:"开通成功后生成一次性家庭邀请码",selector:".child-access-enabled",page:"孩子端管理 / 已开通",role:"监护人",normal:"系统激活孩子账号并生成家庭邀请码，邀请码只绑定当前孩子的原成长主档。",exception:"重复提交保持幂等；邀请码失效或泄露时由家长重新生成，不能绑定其他孩子。",innovation:"用家庭邀请码完成首次设备绑定，同时避免重新创建或拆分成长档案。",enter(){tourResetLayers();switchSystem("parent");state.childAccountEnabled=true;state.inCollege=false;state.appTab="profile";renderParent();childAccountManageModal();}},
  {system:"营员端 · 首次绑定",title:"营员输入邀请码绑定已有成长主档",selector:".child-login-screen",page:"营员端 / 首次绑定",role:"营员、监护人",normal:"输入家长生成的邀请码，验证成功后绑定张小满与 STU-240381。",exception:"邀请码错误、过期、已绑定其他设备或监护授权撤回时阻断登录。",innovation:"营员拥有独立登录体验，但身份来源始终可追溯到家长确认的监护关系。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=false;state.childLoginStage="invite";state.childConversation=null;state.childPage="home";renderChild();}},
  {system:"孩子端 · 使用空间",title:"登录后进入只属于孩子的营期首页",selector:".child-camp-hero--linked",page:"孩子端 / 首页",role:"已开通孩子",normal:"查看当前营期、倒计时、任务、指导师和成长徽章，课程封面读取后台课程配置。",exception:"没有进行中营期时展示成长档案和兴趣内容，不展示购买、合同或预约操作。",innovation:"同一兴智应用支持家长管理与孩子参与，两种身份的界面和权限互不混用。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childConversation=null;state.childPage="home";renderChild();}}
];

childAccessTourSteps.splice(3,0,
  {system:"兴智教育登录",title:"从现有登录页选择“营员登录”",selector:".xingzhi-student-entry",page:"兴智教育 / 登录页",role:"已获得家长授权的营员",normal:"营员打开兴智教育 App，在手机号登录入口下选择“营员登录”。",exception:"未获得家长授权时不进入绑定流程；家长、员工仍使用原手机号或密码登录。",innovation:"在现有登录页补充清晰入口，不新增独立 App，也不把评审顶部系统切换当成真实入口。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=false;state.childLoginStage="main";state.childConversation=null;state.childPage="home";renderChild();}}
);

tourSteps.splice(tourSteps.length-1,0,
  {system:"兴智应用",title:"家长主动为孩子开通受监护账号",selector:".child-access-entry",page:"兴智 App / 我 / 孩子端管理",role:"监护人",normal:"家长选择已匹配的合同孩子，确认能力边界并生成家庭邀请码。",exception:"身份或监护关系校验失败时禁止开通；开通不会转移资格、合同与预约权限。",innovation:"补齐从父母业务管理到孩子自主参与之间的账号开通桥梁。",enter(){tourResetLayers();switchSystem("parent");state.childAccountEnabled=false;state.inCollege=false;state.appTab="profile";renderParent();}},
  {system:"兴智应用",title:"孩子通过受监护账号参与营期",selector:".child-camp-hero",page:"兴智 App / 孩子首页",role:"孩子",normal:"父母完成资格与预约管理后，孩子进入自己的营期任务空间。",exception:"未授权、未绑定 student_id 或没有进行中营期时，不开放营期互动。",innovation:"同一个 App 承载父母管理和孩子参与，但两类权限不混用。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childPage="home";renderChild();}},
  {system:"兴智应用",title:"孩子任务与成长记录回到同一主档",selector:".child-growth-hero",page:"兴智 App / 孩子成长",role:"孩子、父母、孩子指导师",normal:"任务、测评、徽章和指导师证据持续沉淀到原 student_id。",exception:"未审核内容不进入正式报告，账号退出或监护关系变化不删除历史。",innovation:"孩子不只是被管理的参营对象，也能主动看见和参与自己的成长过程。",enter(){tourResetLayers();switchSystem("child");state.childLoggedIn=true;state.childPage="growth";renderChild();}}
);

const opsTourSteps = [
  {system:"传承后台革新",title:"待开通订单先完成履约前置校验",selector:".xorder-hero",page:"待开通订单 / 列表",role:"录单人员、X学院运营",normal:"按订单、课包、合同、父母账号和孩子匹配结果筛选，校验通过后才允许生成服务资格。",exception:"订单未结清、合同缺失、证件重复或身份匹配失败时保持阻断，可转人工处理但不能绕过硬条件。",innovation:"用流程头部、指标卡和状态分组替代字段堆叠，让运营先看清订单处于哪一步。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="xorders";renderOps();}},
  {system:"传承后台革新",title:"待开通订单详情明确本步会做什么",selector:".qualification-checks",page:"待开通订单 / 订单详情",role:"X学院运营",normal:"查看销售课包、关联子产品、合同父母与候选孩子，确认后生成次数、有效期和课程范围。",exception:"异常原因未解除时只允许重新校验或转人工；重复同步保持幂等，不重复生成资格。",innovation:"详情将前置校验、生成结果、不发生事项和处理时间线分区展示。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="xorders";renderOps();openXOrderDrawer("D260817-00231");}},
  {system:"传承后台革新",title:"服务资格以父母账号为持有人",selector:".list-flow-intro",page:"X学院服务资格 / 列表",role:"X学院运营、客服",normal:"按父母账号、有效期、剩余次数和课程范围检索资格，孩子只是后续预约时的候选服务对象。",exception:"资格过期、次数耗尽、合同终止或同步异常时显示明确状态，不能伪装成可预约。",innovation:"列表用余额、有效期和使用状态建立扫描顺序，不再把权益误解为孩子报名记录。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="entitlements";renderOps();}},
  {system:"传承后台革新",title:"服务资格详情同时呈现来源与使用去向",selector:".premium-detail-spotlight",page:"X学院服务资格 / 详情",role:"X学院运营、客服、审计人员",normal:"查看可用次数、资格范围、候选孩子、关联预约、使用流水、合同来源和变更记录。",exception:"调整有效期或次数必须形成流水；历史已核销记录、预约快照和成长记录永不覆盖。",innovation:"详情由静态字段页升级为资格全生命周期视图。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="entitlements";renderOps();openQualificationDrawer();}},
  {system:"传承后台革新",title:"课程母版与具体营期保持清晰边界",selector:".course-object-boundary",page:"X学院课程 / 编辑课程",role:"课程运营、X学院运营",normal:"编辑课程只修改课程定义、适用资格和家长端共用内容；新建营期必须选择已发布课程。",exception:"草稿或停用课程不可创建营期；课程变更不得覆盖既有营期和历史预约快照。",innovation:"编辑弹窗直接说明当前对象与下游对象，把内容产品与一次履约实例彻底分开。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="courses";renderOps();courseCreateModal(0);}},
  {system:"传承后台革新",title:"课程规则与详情页配置各司其职",selector:".course-rule-flow",page:"X学院课程 / 规则配置",role:"课程运营、X学院运营",normal:"课程规则配置资格、适龄、扣减、冲突、候补和变更默认值；详情页配置负责家长看到的内容模块。",exception:"营期日期、地点、营位、名单锁定和交通凭证属于具体营期，不应写回课程母版。",innovation:"将课程内容、默认业务规则和具体营期参数拆成三个清晰层级。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="courses";renderOps();courseRulesDrawer(0);}},
  {system:"传承后台革新",title:"营期管理聚焦一次真实履约",selector:".session-intro",page:"营期管理 / 列表",role:"X学院运营、营期负责人",normal:"从已发布课程创建营期，集中查看时间地点、负责人、教师助教、营位、专属页面和报名状态。",exception:"负责人、关键日期、营位或必要配置缺失时不得发布；已结束营期转入营后管理。",innovation:"列表从课程附属字段升级为按批次管理的履约工作台。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="dashboard";renderOps();}},
  {system:"传承后台革新",title:"营期配置覆盖团队、分组、任务与本期页面",selector:".session-config-tabs",page:"营期管理 / 配置营期",role:"营期负责人",normal:"配置基本信息、负责人、教师助教、自动分组规则、营程任务、本期专属页面、开营通知与播报。",exception:"档期冲突、师生比不足、硬分组规则冲突或页面未发布时给出阻断提示，不覆盖课程默认模板。",innovation:"把一次营期需要交付的配置集中到可切换分区中，并保留规则继承关系。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="dashboard";state.selectedSession=0;renderOps();sessionConfigDrawer(0);}},
  {system:"传承后台革新",title:"执行团队同时配置教师与助教",selector:".staff-picker-list",page:"营期配置 / 添加教师与助教",role:"营期负责人",normal:"按角色、档期、资质筛选人员，并配置助教班组和主要职责。",exception:"存在档期冲突时明确提示；助教不默认获得审批和全部敏感资料权限。",innovation:"人员选择在同一层抽屉内完成，不再出现弹窗叠加和双重遮罩。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="dashboard";state.selectedSession=0;renderOps();sessionStaffPickerModal();}},
  {system:"传承后台革新",title:"报名名单同步展示行前六维完成度",selector:".assessment-kpi",page:"营期报名与分组",role:"X学院运营、营期负责人",normal:"在人数、资料、资格、风险之外查看本期六维测评完成人数，并可逐人识别待完成状态。",exception:"待完成只触发提醒，不影响营位、资格或名单锁定；健康和安全风险仍独立阻断。",innovation:"把成长基线完成度纳入行前运营视图，但保持与安全阻断项分离。",enter(){tourResetLayers();switchSystem("ops");state.selectedSession=0;state.opsPage="sessionRoster";renderOps();}},
  {system:"传承后台革新",title:"名单锁定前后采用两套调班路径",selector:".group-change-route",page:"营期报名与分组 / 调班",role:"营期负责人、X学院运营、审批人",normal:"锁定前直接调整分组预览；锁定后提交目标班、紧急程度和原因，审批通过后生成新分组版本。",exception:"容量、师生比或硬规则不通过时禁止提交；审批完成前原班组、指导师、助教和群关系继续有效。",innovation:"调班从静态按钮升级为分阶段、可校验、可追溯的完整交互。",enter(){tourResetLayers();switchSystem("ops");state.selectedSession=3;state.opsPage="sessionRoster";renderOps();regroupRequestModal(0);}},
  {system:"传承后台革新",title:"预约中心成为预约履约中枢",selector:".reservation-center-intro",page:"预约中心 / 列表",role:"X学院运营、客服",normal:"按待处理、候补、审批和异常视图管理预约状态、资格冻结、营位占用、资料完成和跟进任务。",exception:"时间冲突、资格失效、资料阻断、候补递补和合同异常分别展示资源状态，不允许局部成功。",innovation:"由简单预约记录升级为可筛选、可批量跟进、能解释资源占用的履约列表。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="reservations";state.reservationView="all";renderOps();}},
  {system:"传承后台革新",title:"预约详情串起家庭、营员与具体营期",selector:".reservation-detail-context",page:"预约中心 / 预约详情",role:"X学院运营、客服、审批人",normal:"查看父母账号、参营营员、课程营期、资格、权益、营位、资料待办和完整状态时间线。",exception:"候补不冻结资格、不占正式营位；申请中保留原资源状态；异常处理必须进入对应审批或人工流程。",innovation:"详情不再重复列表字段，而是解释这条预约为什么处于当前状态以及下一步去哪里处理。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="reservations";renderOps();reservationDetailDrawer("RSV-260817-0142");}},
  {system:"传承后台革新",title:"审批中心统一承接特殊业务变更",selector:".list-flow-intro",page:"审批中心 / 列表",role:"审批人、X学院运营",normal:"按申请编号、类型、课程、提交时间和时效筛选取消、改期、换营员与合同异常。",exception:"临近超时突出提醒；材料缺失、目标营期不可用或影响计算失败时禁止执行。",innovation:"审批采用统一列表流，正常履约与特殊决定清晰分离。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="approvals";renderOps();}},
  {system:"传承后台革新",title:"审批详情先预演影响再执行决定",selector:".approval-impact-grid",page:"审批中心 / 审批详情",role:"审批人",normal:"执行前确认服务资格、营位名单、成长历史和通知对象的变化，填写依据后同步业务结果。",exception:"历史成长记录永不迁移或删除；审批结果同步失败时保留原状态并进入重试，不得部分落账。",innovation:"详情从审批表单升级为业务影响预演、材料核验和处理时间线。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="approvals";renderOps();approvalDetailDrawer(state.approvals[0]||{id:"AP-DEMO",type:"改期申请",name:"林知夏",detail:"新疆营调整为东北营",risk:"需重新参营确认"});}},
  {system:"传承后台革新",title:"营后管理独立承接报告生产",selector:".post-camp-page",page:"营后管理 / 营期队列",role:"X学院运营、指导师、营期负责人",normal:"按营期查看行前基线、营中证据、结营测评、个人报告和班级报告的准备度。",exception:"行前基线只读；缺少结营测评、评语或证据审核的报告不得生成或推送。",innovation:"营后工作从营期编辑中剥离，形成独立业务队列和四阶段进度。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="postCamp";renderOps();}},
  {system:"传承后台革新",title:"成长报告展示本期前后与往期变化",selector:".report-radar-section",page:"营后管理 / 个人成长报告",role:"指导师、营期负责人、教务",normal:"在同一张六维雷达图中对比上一期结营、本期营前和本期营后，并关联评语与成长证据。",exception:"缺少本期营后测评或证据未审核时保持待确认，不允许直接推送家长。",innovation:"报告不只给出本期结果，还能观察孩子参加每一期后的连续变化。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="postCamp";renderOps();campReportPreviewDrawer();}}
];

const workbenchTourSteps = [
  {system:"兴智工作台革新",title:"一个工作台承载两类服务场景",selector:".work-mode-switch",page:"工作台 / 场景切换",role:"同时承担督导与孩子指导师的员工",normal:"在父母成长服务和 X学院之间切换工作上下文。",exception:"单一岗位不显示切换；切换后权限和服务对象不得串场。",innovation:"复用现有工作台，避免再建设一套营地执行应用。",enter(){tourResetLayers();switchSystem("camp");state.campMode="parent";state.campPage="workbench";renderCamp();}},
  {system:"兴智工作台革新",title:"X学院首页从功能宫格转为营期驾驶舱",selector:".camp-context-card",page:"X学院工作台",role:"孩子指导师",normal:"先看到当前营期、班组、签到进度、今日任务和风险。",exception:"没有营期分配时展示空状态；跨营期切换必须重置数据范围。",innovation:"信息按“今天要完成什么”组织，而不是把全部功能平铺。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="workbench";renderCamp();}},
  {system:"兴智工作台革新",title:"工作消息增加 X学院业务过滤",selector:".message-filters",page:"工作台 / 消息",role:"督导、孩子指导师",normal:"按全部、父母服务、X学院过滤会话和任务通知。",exception:"营员健康信息只进入必要岗位会话，群发不得包含敏感内容。",innovation:"复用原消息能力，同时把双业务上下文明确标记。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="messages";state.campMessageFilter="all";renderCamp();}},
  {system:"兴智工作台革新",title:"我的营员按班组、状态和风险管理",selector:".roster-filters",page:"工作台 / 我的营员",role:"孩子指导师",normal:"查看本班营员、签到、资料和重点关注状态。",exception:"无权查看其他班组；健康资料仅必要可见且访问留痕。",innovation:"原“我的学员”通讯录升级为营期执行名单。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="people";renderCamp();}},
  {system:"兴智工作台革新",title:"营程配置自动生成岗位任务",selector:".task-filter-tabs",page:"工作台 / 全部任务",role:"孩子指导师、营期负责人",normal:"筛选今日、我的、待完成和已完成任务。",exception:"任务超时升级；风险事件追加临时任务；模板变化不覆盖完成历史。",innovation:"后台营程计划直接转化为一线执行清单。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="tasks";state.campTaskFilter="today";renderCamp();}},
  {system:"兴智工作台革新",title:"签到升级为关键业务核验节点",selector:".checkin-tools",page:"工作台 / 到营签到",role:"孩子指导师",normal:"支持扫码、批量和手工复核签到。",exception:"名单不符、资格无效、健康阻断、重复签到均禁止核销；未到营登记异常。",innovation:"签到同时驱动资格核销、任务完成和家长通知。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="checkin";renderCamp();}},
  {system:"兴智工作台革新",title:"成长记录强调可验证行为证据",selector:".form-body",page:"工作台 / 成长记录",role:"孩子指导师",normal:"选择营员、行为标签，填写观察并上传照片或作品。",exception:"空泛评价、无服务关系或未审核内容不得进入正式报告。",innovation:"从总结式评价升级为行为、证据、标签相互关联的记录。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="records";renderCamp();}},
  {system:"兴智工作台革新",title:"异常按类型、等级和闭环状态管理",selector:".incident-grid",page:"工作台 / 异常上报",role:"孩子指导师、医疗老师、营期负责人",normal:"按健康、安全、行为、交通住宿创建异常并跟踪关闭。",exception:"P1/P2 必须升级通知；未填写处置结果和复核人不得关闭。",innovation:"异常从群里报备升级为有责任人、时限和复核的闭环工单。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="incident";renderCamp();}},
  {system:"兴智工作台革新",title:"岗位与隐私边界在个人页明确展示",selector:".permission-note",page:"工作台 / 我",role:"工作台员工",normal:"展示组织、双场景岗位、当前营期权限和访问记录。",exception:"不能修改合同、资格、预约审批和营期规则。",innovation:"把“能看什么、能做什么”直接呈现给一线人员。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="profile";renderCamp();}}
];

workbenchTourSteps.splice(workbenchTourSteps.length-1,0,
  {system:"兴智工作台革新",title:"营地播报从素材箱升级为审核发布体系",selector:".camp-broadcast-page",page:"工作台 / 营地播报",role:"摄影师、助教、指导师、营长",normal:"按相册、文字、短视频、公众号文章和直播提交内容，营长审核后发布。",exception:"涉及敏感信息、未授权素材或实时安全点位时禁止发布；撤回保留审核记录。",innovation:"播报拥有独立时间轴、审核状态和家长阅读统计，不再等同于班级群消息。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="broadcast";renderCamp();}},
  {system:"兴智工作台革新",title:"营后报告由营期证据自动汇总",selector:".camp-report-page",page:"工作台 / 营后报告",role:"孩子指导师、营期负责人、教务",normal:"汇总前后六维测评、行为记录、徽章、照片视频和满意度，生成个人PDF与班级报告。",exception:"缺少结营测评、指导师评语或证据审核时报告保持待确认，不得直接推送。",innovation:"报告生成与成长档案打通，推送后沉淀到原 student_id。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="reports";renderCamp();}}
);

const exceptionTourSteps = [
  {system:"异常与审批",title:"父母账号没有有效服务资格",selector:".college-intro-hero",page:"App / X学院无资格页",role:"父母",normal:"仍可浏览课程介绍并联系指导师。",exception:"不展示预约按钮、次数或孩子已报名信息。",innovation:"用可转化的介绍页替代空白和报错。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=false;state.inCollege=false;state.appTab="heritage";state.homeTab="college";renderParent();}},
  {system:"异常与审批",title:"课程不在当前资格范围",selector:".consult-session",page:"App / 课程详情咨询态",role:"父母",normal:"可查看完整内容并发起咨询。",exception:"禁止冻结次数、占营位或伪装成可预约。",innovation:"内容开放，交易能力按资格精确控制。",enter(){tourResetLayers();switchSystem("parent");state.parentHasCollegeEntitlement=true;state.selectedCourse="rainforest";state.sessionDemo=null;state.inCollege=true;state.parentPage="courseDetail";renderParent();}},
  {system:"异常与审批",title:"正式营位已满进入候补",selector:".waitlist-countdown",page:"App / 课程详情候补态",role:"父母",normal:"展示递补确认倒计时，可接受或放弃。",exception:"候补允许时间重叠；转正式时重新校验资格、冲突和营位。",innovation:"候补状态与正式预约资源占用清楚分离。",enter(){tourResetLayers();switchSystem("parent");state.selectedCourse="northeast";state.sessionDemo=null;state.inCollege=true;state.parentPage="courseDetail";renderParent();}},
  {system:"异常与审批",title:"名单锁定后资料禁止直接覆盖",selector:".materials-lock-bar",page:"App / 已锁定营期资料",role:"父母",normal:"仍可查看锁定时的交通、健康、接送和协议。",exception:"任何修改必须提交资料变更申请，并保留原版本。",innovation:"把“不能改”转化为可解释、可申请、可追踪的路径。",enter(){tourResetLayers();switchSystem("parent");state.selectedCourse="desert";state.sessionDemo="locked";state.inCollege=true;state.parentPage="courseDetail";renderParent();}},
  {system:"异常与审批",title:"合同终止按预约阶段分流",selector:".approval-list",page:"SCRM / 合同异常",role:"销售运营、X学院运营",normal:"终止前展示对关联预约和资格的影响。",exception:"未确认预约自动取消；已确认或锁定转人工；已完成历史不变。",innovation:"合同变化不再粗暴删除下游数据。",enter(){tourResetLayers();switchSystem("scrm");state.scrmPage="exceptions";renderSCRM();}},
  {system:"异常与审批",title:"锁定后取消、改期和换营员进入审批",selector:".filter-panel",page:"传承后台 / 审批中心",role:"审批人、X学院运营",normal:"按类型、课程、状态、时效筛选和处理。",exception:"审批前计算次数、营位、名单和通知影响；计算失败不能提交。",innovation:"异常处理采用统一列表流和业务影响预览。",enter(){tourResetLayers();switchSystem("ops");state.opsPage="approvals";renderOps();}},
  {system:"异常与审批",title:"健康阻断必须单人复核",selector:".health-confirm",page:"工作台 / 签到健康复核",role:"孩子指导师、医疗老师",normal:"确认应急药物和用餐标识后方可签到。",exception:"批量签到自动排除阻断营员，未勾选确认不能提交。",innovation:"风险信息直接进入操作前置条件，而不是仅作备注。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="checkin";renderCamp();checkinReviewModal("林知夏");}},
  {system:"异常与审批",title:"未按时到营形成跟踪任务",selector:"#modalContent .form-grid",page:"工作台 / 未到营异常",role:"孩子指导师、营期负责人",normal:"登记交通延误、无法联系或身体不适及预计到达时间。",exception:"高风险或长期无法联系时升级营期负责人，不得直接标记爽约。",innovation:"把现场口头沟通转为可跟踪的异常记录。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="checkin";renderCamp();missingArrivalModal();}},
  {system:"异常与审批",title:"营中异常按等级持续跟踪到关闭",selector:".processing-incident",page:"工作台 / 异常上报",role:"指导师、医疗老师、营期负责人",normal:"查看处理中事件、当前接手人和等待时长。",exception:"P1/P2 未复核不得关闭，家长沟通和处置结果必须留痕。",innovation:"异常处理由一次上报升级为责任闭环。",enter(){tourResetLayers();switchSystem("camp");state.campMode="college";state.campPage="incident";renderCamp();}}
];

const tourPageGroups = [
  {key:"app",title:"兴智 App（家长端 + 营员端）",count:28,tone:"violet",pages:["传承首页·家庭成长树","X学院无资格介绍","X学院会员首页","课程目录","课程详情","我的本期","我的行程","参营确认","交通/健康/接送/协议","入营前六维测评","候补递补","消息与结构化通知","通讯录与指导师关系","班级群","个人工具","营员端开通入口","监护确认与能力边界","家庭邀请码与开通结果","家长端成长档案","家长端六维数据明细","兴智教育登录页·营员入口","营员登录与绑定","营员首页（后台封面联动）","营员今日任务","营员六维自评","营员受控消息列表","营员手机内会话页","营员成长档案（统一六维图）","营员我的空间"]},
  {key:"scrm",title:"SCRM",count:9,tone:"blue",pages:["产品列表","创建课包","创建子产品","产品详情","订单列表","创建订单","订单详情","电子合同","同步与合同异常"]},
  {key:"ops",title:"传承后台",count:27,tone:"green",pages:["统一订单中心","父母课程待分配","常规班级与阶段","待开通订单列表","待开通订单详情","服务资格列表","服务资格详情","营员与家庭用户","营员家庭详情与成长档案","X学院课程","编辑课程母版","课程规则配置","课程详情页配置","营期管理","营期基本配置","营期执行团队与助教","自动分组规则","报名与名单","行前六维完成监控","自动分组与调班","预约中心列表","预约详情","审批中心列表","审批详情与影响预演","本期专属页面与播报","营后管理","六维成长报告与往期对比"]},
  {key:"work",title:"兴智工作台",count:10,tone:"orange",pages:["场景切换","X学院工作台","消息","我的营员","全部任务","到营签到","成长记录","异常上报","营地播报/班级群","岗位与权限"]}
];
const workbenchPageGroup=tourPageGroups.find(group=>group.key==="work");
if(workbenchPageGroup){workbenchPageGroup.count=12;workbenchPageGroup.pages.splice(9,0,"营地播报审核与阅读统计","营后报告生成与推送");}

const tourRoutes = {
  full:{title:"全链路导览",subtitle:"从销售签约到成长档案",steps:tourSteps,icon:"链",tone:"violet"},
  app:{title:"兴智 App · 家长端",subtitle:"看父母端新增页面、融合方式和异常状态",steps:appTourSteps,icon:"家",tone:"blue"},
  account:{title:"家长开通营员端",subtitle:"从管理入口、监护确认、邀请码到营员首次登录",steps:childAccessTourSteps,icon:"启",tone:"orange"},
  child:{title:"兴智 App · 营员端",subtitle:"看受监护登录、任务、测评、消息、成长与权限",steps:childTourSteps,icon:"营",tone:"violet"},
  ops:{title:"后台运营革新",subtitle:"完整查看七大模块、详情页、异常状态与业务边界",steps:opsTourSteps,icon:"后",tone:"green"},
  workbench:{title:"兴智工作台革新",subtitle:"看孩子指导师如何完成营地履约",steps:workbenchTourSteps,icon:"工",tone:"green"},
  exception:{title:"异常与审批",subtitle:"看资格、候补、锁定、合同和现场异常",steps:exceptionTourSteps,icon:"异",tone:"orange"}
};

let activeTourSteps = tourSteps;
let activeTourRoute = tourRoutes.full;

function openTourHub() {
  endTour(false);
  const layer=document.createElement("div");
  layer.id="tourHub";
  layer.className="tour-hub-layer";
  const totalTourPages=tourPageGroups.reduce((sum,g)=>sum+g.count,0);
    layer.innerHTML=`<section class="tour-hub" role="dialog" aria-modal="true" aria-label="X学院导览中心"><header><div><span class="eyebrow">研发评审导览 · 最新同步</span><h2>想先看哪一部分？</h2><p>共覆盖 4 套系统、${totalTourPages} 个页面/状态；兴智 App 同时包含家长与孩子两类受控身份。每条路线都会进入真实原型页面，并说明角色、正常路径、异常处理和本次革新。</p></div><button data-tour-hub-close aria-label="关闭导览中心">×</button></header><section class="tour-latest-updates"><div><span>本轮重点</span><b>建议先看“家长开通孩子端”</b><small>完整演示从家长入口、监护确认、生成邀请码到孩子首次登录。</small></div><ul><li><i>1</i><span><b>孩子端开通链路</b><small>入口、确认、邀请码、首次登录</small></span></li><li><i>2</i><span><b>家长六维数据明细</b><small>六项变化在手机宽度内完整显示</small></span></li><li><i>3</i><span><b>三端数据联动</b><small>课程封面与六维成长数据统一</small></span></li></ul></section><main><section class="tour-route-section"><div class="tour-hub-title"><span><small>专题路线</small><b>选择要评审的完整流程</b></span><em>支持任意步骤跳转</em></div><div class="tour-route-grid">${Object.entries(tourRoutes).map(([key,route])=>`<button class="tour-route-card ${route.tone} ${key==='account'?'is-recommended':''}" data-tour-route="${key}">${key==='account'?'<mark>本轮新增</mark>':''}<i>${route.icon}</i><span><b>${route.title}</b><small>${route.subtitle}</small><em>${route.steps.length} 个讲解步骤</em></span><strong>开始 ›</strong></button>`).join("")}</div><div class="tour-innovation-summary"><article><i>应</i><span><b>App 的核心革新</b><small>父母管理资格与预约并为孩子开通账号；孩子完成任务与成长互动，共享 student_id 但权限隔离。</small></span></article><article><i>后</i><span><b>后台的核心革新</b><small>七大模块统一列表与详情体验，串起订单开通、服务资格、课程营期、预约审批和营后报告。</small></span></article><article><i>工</i><span><b>工作台的核心革新</b><small>双场景岗位、营期驾驶舱、任务驱动执行、签到核验、异常闭环和隐私边界。</small></span></article></div></section><aside class="tour-page-map"><div class="tour-hub-title"><span><small>页面地图</small><b>页面与状态地图</b></span><em>共 ${totalTourPages} 项</em></div>${tourPageGroups.map((group,index)=>`<details ${index===0?'open':''}><summary><i class="${group.tone}">${group.key==='app'?'应':group.key==='scrm'?'销':group.key==='ops'?'后':'工'}</i><span><b>${group.title}</b><small>${group.count} 个页面/关键状态</small></span><em>⌄</em></summary><div>${group.pages.map(page=>`<span>${page}</span>`).join("")}</div></details>`).join("")}</aside></main></section>`;
  const latestUpdates=layer.querySelector('.tour-latest-updates');
  if(latestUpdates) latestUpdates.innerHTML=`<div><span>本轮重点</span><b>建议先看“家长开通营员端”</b><small>完整演示家长授权、现有兴智登录页入口、家庭邀请码绑定和营员首次进入自己的空间。</small></div><ul><li><i>1</i><span><b>真实登录入口</b><small>沿用兴智教育登录页，新增“营员登录”</small></span></li><li><i>2</i><span><b>首次绑定链路</b><small>家庭邀请码、原 student_id 与监护授权</small></span></li><li><i>3</i><span><b>营员端统一命名</b><small>家长端、营员端、后台和工作台称谓一致</small></span></li></ul>`;
  document.body.append(layer);
  document.body.classList.add("tour-running");
}

function ensureTourLayer() {
  let layer = $("#tourLayer");
  if (layer) return layer;
  layer = document.createElement("div");
  layer.id = "tourLayer";
  layer.className = "tour-layer";
  layer.innerHTML = `<div class="tour-focus" id="tourFocus"></div><aside class="tour-card" id="tourCard" role="dialog" aria-modal="true" aria-label="X学院全流程导览"></aside>`;
  document.body.append(layer);
  return layer;
}

function positionTourFocus(selector) {
  const target = $(selector);
  const focus = $("#tourFocus");
  const card = $("#tourCard");
  if (!target || !focus || !card) {
    focus?.classList.add("is-hidden");
    return;
  }
  target.scrollIntoView({block:"center", inline:"center", behavior:"smooth"});
  setTimeout(() => {
    const rect = target.getBoundingClientRect();
    const gap = 8;
    focus.classList.remove("is-hidden");
    focus.style.setProperty("--tour-top", `${Math.max(8,rect.top-gap)}px`);
    focus.style.setProperty("--tour-left", `${Math.max(8,rect.left-gap)}px`);
    focus.style.setProperty("--tour-width", `${Math.min(window.innerWidth-16,rect.width+gap*2)}px`);
    focus.style.setProperty("--tour-height", `${Math.min(window.innerHeight-16,rect.height+gap*2)}px`);
    card.classList.toggle("place-left", rect.left + rect.width/2 > window.innerWidth/2);
  }, 260);
}

function renderTourStep(index=tourIndex) {
  tourIndex = Math.max(0,Math.min(index,activeTourSteps.length-1));
  const step = activeTourSteps[tourIndex];
  const detail = {...(tourStepDetails[step.title]||{}),...step};
  tourActive = true;
  document.body.classList.add("tour-running");
  ensureTourLayer();
  step.enter();
  const progress = Math.round((tourIndex+1)/activeTourSteps.length*100);
  $("#tourCard").innerHTML = `<header><span class="tour-system">${activeTourRoute.title} · ${step.system}</span><button data-tour-exit aria-label="退出导览">×</button></header><div class="tour-progress"><i style="--tour-progress:${progress}%"></i><span>${tourIndex+1} / ${activeTourSteps.length}</span></div><h2>${step.title}</h2><div class="tour-context"><span><small>当前页面</small><b>${detail.page||step.title}</b></span><span><small>主要角色</small><b>${detail.role||"产品与业务评审人员"}</b></span></div><p>${step.text||detail.normal}</p><div class="tour-detail-grid"><article class="normal"><i>正</i><span><small>正常路径</small><b>${detail.normal||step.result}</b></span></article><article class="exception"><i>异</i><span><small>异常情况</small><b>${detail.exception||"异常时阻断当前操作并保留原业务状态。"}</b></span></article><article class="innovation"><i>新</i><span><small>本次革新</small><b>${detail.innovation||step.result}</b></span></article></div><div class="tour-step-dots" aria-label="导览步骤">${activeTourSteps.map((item,i)=>`<button class="${i===tourIndex?'active':i<tourIndex?'done':''}" data-tour-go="${i}" title="${item.title}">${i+1}</button>`).join("")}</div><footer><button class="tour-secondary" data-tour-prev ${tourIndex===0?'disabled':''}>上一步</button><button class="tour-skip" data-tour-hub>导览中心</button><button class="tour-primary" data-tour-next>${tourIndex===activeTourSteps.length-1?'完成导览':'下一步'}</button></footer>`;
  positionTourFocus(step.selector);
}

function startTour(routeKey="full") {
  activeTourRoute=tourRoutes[routeKey]||tourRoutes.full;
  activeTourSteps=activeTourRoute.steps;
  $("#tourHub")?.remove();
  tourIndex = 0;
  renderTourStep(0);
}

function endTour(completed=false) {
  tourActive = false;
  $("#tourLayer")?.remove();
  $("#tourHub")?.remove();
  document.body.classList.remove("tour-running");
  tourResetLayers();
  if (completed) {
    switchSystem("overview");
    showToast(`${activeTourRoute.title}已完成`,`可随时点击顶部“全流程导览”选择其他路线`);
  }
}

function demoRule(type) {
  if (type === "conflict") { switchSystem("parent"); state.inCollege=true; state.parentPage="reservations"; renderParent(); setTimeout(waitlistModal,200); }
  if (type === "cancel") { switchSystem("parent"); state.inCollege=true; state.parentPage="reservations"; renderParent(); setTimeout(()=>actionModal("cancel"),200); }
  if (type === "change") { switchSystem("ops"); state.opsPage="approvals"; renderOps(); setTimeout(()=>actionModal("change"),200); }
  if (type === "contract") { switchSystem("scrm"); state.scrmPage="exceptions"; renderSCRM(); setTimeout(()=>document.querySelector('[data-action="terminate-contract"]')?.focus(),250); }
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-action], [data-qualification-select]");
  if (!target) return;
  if (target.matches("[data-start-tour],[data-tour-hub]")) { openTourHub(); return; }
  if (target.matches("[data-tour-hub-close]")) { endTour(false); return; }
  if (target.matches("[data-tour-route]")) { startTour(target.dataset.tourRoute); return; }
  if (target.matches("[data-tour-exit]")) { endTour(false); return; }
  if (target.matches("[data-tour-prev]")) { renderTourStep(tourIndex-1); return; }
  if (target.matches("[data-tour-next]")) { if(tourIndex===activeTourSteps.length-1) endTour(true); else renderTourStep(tourIndex+1); return; }
  if (target.matches("[data-tour-go]")) { renderTourStep(Number(target.dataset.tourGo)); return; }
  if (target.matches("[data-system]")) switchSystem(target.dataset.system);
  if (target.matches("[data-jump]")) switchSystem(target.dataset.jump);
  if (target.matches("[data-child-page]")) { state.childPage=target.dataset.childPage; state.childConversation=null; state.childLoggedIn=true; renderChild(); }
  if (target.matches("[data-action='child-login-demo']")) childLoginModal();
  if (target.matches("[data-action='student-login-entry']")) { state.childLoginStage='invite'; renderChild(); }
  if (target.matches("[data-action='student-login-back']")) { state.childLoginStage='main'; renderChild(); }
  if (target.matches("[data-action='child-login-submit']")) { const code=$("#childInviteCode")?.value.trim(); if(!code){showToast("请输入家庭邀请码","邀请码由家长账号生成并绑定对应的 student_id");return;} state.childLoggedIn=true;state.childPage='home';renderChild();showToast("营员账号登录成功","已绑定张小满 · STU-240381，监护授权同步生效"); }
  if (target.matches("[data-child-task]")) childTaskModal(target.dataset.childTask);
  if (target.matches("[data-action='complete-child-task']")) { const name=target.dataset.taskName; if(name==='给未来的自己写一句话'&&!$("#childTaskText")?.value.trim()){showToast("先写下一句话吧","内容会作为本期成长记录保存");return;} state.childTaskDone.add(name);closeModal();state.childPage='tasks';renderChild();showToast("任务已完成",`${name} 已进入当前营期任务记录`); }
  if (target.matches("[data-scale-value]")) { const wrap=target.closest('.child-scale'); $$('button',wrap).forEach(btn=>btn.classList.toggle('active',btn===target)); }
  if (target.matches("[data-action='submit-child-assessment']")) { const completed=$$('.child-scale').filter(scale=>scale.querySelector('button.active')).length; if(completed<6&&!state.childAssessmentDone){showToast("还有题目没有选择",`已完成 ${completed}/6 个维度，请完成后再提交`);return;} state.childAssessmentDone=true;state.childTaskDone.add('入营前六维测评');renderChild();showToast("六维测评已提交","本期营前成长基线已保存，结果不影响报名、分班与签到"); }
  if (target.matches("[data-child-message-filter]")) { state.childMessageFilter=target.dataset.childMessageFilter; renderChild(); }
  if (target.matches("[data-child-conversation]")) { state.childConversation=target.dataset.childConversation; state.childPage='messages'; renderChild(); }
  if (target.matches("[data-action='child-conversation-back']")) { state.childConversation=null; renderChild(); }
  if (target.matches("[data-action='send-child-message']")) showToast("消息已发送","消息仅进入当前指导师/班级会话，并保留监护安全记录");
  if (target.matches("[data-action='tell-parent']")) showToast("已告诉家长","林女士会在父母端收到课程兴趣提醒，正式预约仍由家长完成");
  if (target.matches("[data-action='child-report-preview']")) showToast("成长报告已打开","展示六维变化、指导师寄语和已审核成长证据，不展示后台评分规则");
  if (target.matches("[data-action='child-login-devices']")) showToast("登录设备记录","当前设备：张小满的手机 · 2026-08-18 09:21；异常设备需家长确认");
  if (target.matches("[data-action='child-ask-parent']")) showToast("权限申请已发送","新增消息或内容权限需要林女士在父母端确认");
  if (target.matches("[data-action='child-help']")) showToast("安全帮助已打开","可以联系指导师、营期负责人或通知家长");
  if (target.matches("[data-action='child-logout']")) { state.childLoggedIn=false;state.childLoginStage='main';renderChild();showToast("已退出营员账号","成长记录仍保存在 STU-240381，不会因退出而清除"); }
  if (target.matches("[data-demo]")) demoRule(target.dataset.demo);
  if (target.matches("[data-close-modal]")) closeModal();
  if (target.matches("[data-parent-mode='app']")) { state.sessionDemo=null; state.inCollege=false; state.appTab='heritage'; state.homeTab='tree'; renderParent(); }
  if (target.matches("[data-parent-mode='college']")) { state.sessionDemo=null; state.inCollege=false; state.appTab='heritage'; state.homeTab='college'; renderParent(); }
  if (target.matches("[data-home-tab]")) { state.inCollege=false; state.appTab='heritage'; state.homeTab=target.dataset.homeTab; renderParent(); }
  if (target.matches("[data-entitlement-demo]")) { state.parentHasCollegeEntitlement=target.dataset.entitlementDemo==='active'; state.inCollege=false; state.appTab='heritage'; state.homeTab='college'; renderParent(); showToast(state.parentHasCollegeEntitlement?'已切换为有权益父母账号':'已切换为无权益父母账号','仅用于评审条件分支，不是用户可修改的功能'); }
  if (target.matches("[data-app-tab]")) { state.inCollege=false; state.appTab=target.dataset.appTab; if(state.appTab==='messages') state.activeChat=null; renderParent(); }
  if (target.matches("[data-parent-page]")) { state.sessionDemo=null; state.inCollege=true; state.parentPage=target.dataset.parentPage; renderParent(); }
  if (target.matches("[data-parent-demo='locked']")) { state.parentHasCollegeEntitlement=true; state.selectedCourse="desert"; state.sessionDemo="locked"; state.inCollege=true; state.parentPage="courseDetail"; renderParent(); }
  if (target.matches("[data-action='open-course-detail']")) { state.sessionDemo=null; state.selectedCourse=target.dataset.courseKey||"desert"; state.inCollege=true; state.parentPage="courseDetail"; renderParent(); }
  if (target.matches("[data-action='open-course-catalog']")) { state.inCollege=true; state.parentPage="courses"; renderParent(); }
  if (target.matches("[data-action='open-college']")) { state.inCollege=true; state.parentPage='home'; renderParent(); }
  if (target.matches("[data-action='close-college']")) { state.inCollege=false; state.appTab='heritage'; state.homeTab='college'; renderParent(); }
  if (target.matches("[data-action='college-consult']")) { state.inCollege=false; state.appTab='contacts'; renderParent(); showToast("已进入咨询通道","可从X学院服务关系联系课程顾问"); }
  if (target.matches("[data-action='open-inbox']")) { state.inCollege=false; state.appTab='messages'; state.activeChat='collegeNotice'; renderParent(); }
  if (target.matches("[data-message-filter]")) { state.messageFilter=target.dataset.messageFilter; state.activeChat=null; renderParent(); }
  if (target.matches("[data-chat]")) { state.activeChat=target.dataset.chat; state.inCollege=false; state.appTab='messages'; renderParent(); }
  if (target.matches("[data-action='chat-back']")) { state.activeChat=null; renderParent(); }
  if (target.matches("[data-action='send-message']")) { const input=$("#imMessageInput"); const message=input?.value.trim(); if(!message) return; (state.sentMessages[state.activeChat]??=[]).push(message); renderParent(); showToast("消息已发送","会话已同步到兴智IM"); }
  if (target.matches("[data-action='contact-course']")) { state.inCollege=false; state.appTab='heritage'; state.homeTab='college'; renderParent(); }
  if (target.matches("[data-action='open-scanner']")) { openModal(`<span class="eyebrow">扫码</span><h2>扫描二维码</h2><p class="modal-lead">将二维码放入取景框，可用于课程签到、活动核验与资料查看。</p><div class="scanner-preview"><span></span><i>⌗</i><small>正在识别二维码…</small></div><div class="modal-actions"><button class="btn btn--primary" data-close-modal>关闭扫码</button></div>`); }
  if (target.matches("[data-action='child-account-manage']")) childAccountManageModal();
  if (target.matches("[data-action='enable-child-account']")) { if(!$("#childAccessConfirm")?.checked){showToast("请先确认监护人开通","勾选确认后才能为孩子生成独立登录邀请码");return;} state.childAccountEnabled=true;renderParent();childAccountManageModal();showToast("孩子端已开通","已绑定张小满 · STU-240381，并生成家庭邀请码 XM2026"); }
  if (target.matches("[data-action='copy-child-invite']")) showToast("邀请码已复制","XM2026 · 仅用于张小满首次登录孩子端");
  if (target.matches("[data-action='preview-child-app']")) { closeModal();switchSystem("child");state.childLoggedIn=true;state.childPage='home';state.childConversation=null;renderChild(); }
  if (target.matches("[data-scrm-page]")) { state.scrmPage=target.dataset.scrmPage; renderSCRM(); }
  if (target.matches("[data-action='scrm-create-product']")) scrmCreateProductModal();
  if (target.matches("[data-scrm-product-kind]")) scrmCreateProductModal(target.dataset.scrmProductKind);
  if (target.matches("[data-action='save-scrm-product']")) { closeModal(); showToast("产品已保存","课包可上架销售；子产品保持不单卖并等待课包关联"); }
  if (target.matches("[data-action='scrm-create-order']")) scrmCreateOrderModal();
  if (target.matches("[data-action='save-scrm-order']")) { closeModal(); state.scrmPage='orders'; renderSCRM(); showToast("订单已创建","已保存自然探索成长课包与2个关联子产品的组合快照"); }
  if (target.matches("[data-action='scrm-product-detail']")) openScrmProductDetail(Number(target.dataset.productIndex));
  if (target.matches("[data-scrm-order]")) { state.scrmOrderTab='contract'; openScrmOrderDrawer(); }
  if (target.matches("[data-scrm-order-tab]")) { state.scrmOrderTab=target.dataset.scrmOrderTab; openScrmOrderDrawer(); }
  if (target.matches("[data-action='scrm-view-contract']")) { state.scrmContractTab='basic'; openScrmContractDrawer(); }
  if (target.matches("[data-scrm-contract-tab]")) { state.scrmContractTab=target.dataset.scrmContractTab; openScrmContractDrawer(); }
  if (target.matches("[data-action='scrm-back-order']")) openScrmOrderDrawer();
  if (target.matches("[data-action='legacy-assign']")) legacyAssignModal();
  if (target.matches("[data-action='confirm-legacy-assign']")) { closeModal(); showToast("家长服务订单已分配","已进入明心营 · 南昌第08班，并关联督导黄树诚"); }
  if (target.matches("[data-action='open-x-order']")) openXOrderDrawer(target.dataset.xorderId);
  if (target.matches("[data-xorder-view]")) { state.xOrderView=target.dataset.xorderView; state.selectedXOrders.clear(); renderOps(); }
  if (target.matches("[data-action='apply-xorder-filters']")) { state.xOrderFilters={keyword:$("#xOrderKeyword")?.value.trim()||"",package:$("#xOrderPackage")?.value||"全部课包",validation:$("#xOrderValidation")?.value||"全部校验",sync:$("#xOrderSync")?.value||"全部同步"}; state.selectedXOrders.clear(); renderOps(); }
  if (target.matches("[data-action='reset-xorder-filters']")) { state.xOrderFilters={keyword:"",package:"全部课包",validation:"全部校验",sync:"全部同步"}; state.xOrderView="all"; state.selectedXOrders.clear(); renderOps(); }
  if (target.matches("[data-action='select-all-xorders']")) { getFilteredXOrderRows().forEach(row=>target.checked?state.selectedXOrders.add(row.id):state.selectedXOrders.delete(row.id)); renderOps(); }
  if (target.matches("[data-action='batch-open-xorders']")) { const selected=xOrderRows.filter(row=>state.selectedXOrders.has(row.id)); const ready=selected.filter(row=>row.stage==='ready'); if(!ready.length){ showToast("没有可批量开通的订单","异常订单必须先完成人工处理或补齐前置条件"); return; } ready.forEach(row=>{row.stage='done';row.sync='已开通';row.updated='08-17 16:05';}); const skipped=selected.length-ready.length; state.selectedXOrders.clear(); renderOps(); showToast(`已开通 ${ready.length} 个资格`,skipped?`异常订单已跳过 ${skipped} 个并保留在待处理队列`:'资格已生成并同步至服务资格列表'); }
  if (target.matches("[data-action='sync-xorders']")) { const selected=state.selectedXOrders.size?xOrderRows.filter(row=>state.selectedXOrders.has(row.id)):getFilteredXOrderRows(); selected.forEach(row=>{ if(row.stage==='pending') row.sync='待处理'; row.updated='08-17 16:08'; }); renderOps(); showToast("订单校验已重新同步",`${selected.length} 条订单已重新拉取SCRM合同、子产品和账号匹配结果`); }
  if (target.matches("[data-action='export-xorders']")) showToast("校验结果已生成","已按当前视图与筛选条件导出订单、合同、账号匹配和阻断原因");
  if (target.matches("[data-action='xorder-manual']")) xOrderManualModal(target.dataset.xorderId);
  if (target.matches("[data-action='save-xorder-manual']")) { closeModal(); const order=xOrderRows.find(row=>row.id===target.dataset.xorderId); if(order){order.sync='人工处理中'; order.updated='08-17 16:12';} showToast("人工处理方案已保存","已创建处理记录，完成补充后可重新同步校验"); renderOps(); }
  if (target.matches("[data-action='confirm-x-qualification']")) { const order=xOrderRows.find(row=>row.id===target.dataset.xorderId)||xOrderRows.find(row=>row.stage==='ready'); if(order){order.stage='done';order.sync='已开通';order.updated='08-17 16:15';} closeDrawer(); state.opsPage='entitlements'; renderOps(); showToast("X学院服务资格已开通","父母账号获得对应次数与课程范围；孩子和营期仍需后续预约选择"); }
  if (target.matches("[data-action='view-qualification']")) openQualificationDrawerInteractive(target.dataset.qualificationId||'XQ-202608-0284','overview');
  if (target.matches("[data-qualification-tab]")) openQualificationDrawerInteractive(target.dataset.qualificationId,target.dataset.qualificationTab);
  if (target.matches("[data-action='view-qualification-ledger']")) openQualificationDrawerInteractive(target.dataset.qualificationId||'XQ-202608-0284','ledger');
  if (target.matches("[data-action='view-qualification-source']")) showToast("来源订单已定位",`已关联 ${target.textContent.trim()}，可继续核对合同、课包与子产品映射`);
  if (target.matches("[data-action='export-qualifications']")) showToast("资格结果已导出","已按当前筛选条件生成服务资格、余额、冻结次数和有效期明细");
  if (target.matches("[data-action='select-all-qualifications']")) { if(target.checked) qualificationRows.forEach(q=>state.selectedQualifications.add(q.id)); else state.selectedQualifications.clear(); renderOps(); }
  if (target.matches("[data-qualification-select]")) { if(target.checked) state.selectedQualifications.add(target.dataset.qualificationSelect); else state.selectedQualifications.delete(target.dataset.qualificationSelect); renderOps(); }
  if (target.matches("[data-action='batch-extend-qualifications']")) qualificationExpiryModal([...state.selectedQualifications][0],true);
  if (target.matches("[data-action='adjust-qualification-expiry']")) qualificationExpiryModal(target.dataset.qualificationId,false);
  if (target.matches("[data-action='save-qualification-expiry']")) { const note=$("#qualificationExpiryNote")?.value.trim(); if(!note){ showToast("请填写调整说明","需要记录合同、审批或业务依据后才能生成变更流水"); $("#qualificationExpiryNote")?.focus(); return; } const batch=target.dataset.batch==='1'; const count=batch?state.selectedQualifications.size:1; closeModal(); showToast(batch?"批量有效期已调整":"有效期已调整",`已更新 ${count} 条服务资格，并生成不可覆盖的资格变更流水`); if(batch){state.selectedQualifications.clear();renderOps();} else openQualificationDrawerInteractive(target.dataset.qualificationId,'changes'); }
  if (target.matches("[data-action='qualification-open-reservation']")) { closeDrawer(); state.opsPage='reservations'; renderOps(); showToast("已进入预约中心","已按当前服务资格定位关联预约，可继续查看营位、资料与状态时间线"); }
  if (target.matches("[data-action='apply-approval-filters']")) { state.approvalFilters={keyword:$("#approvalKeyword")?.value.trim()||"",type:$("#approvalType")?.value||"全部类型",course:$("#approvalCourse")?.value||"全部课程"}; renderOps(); }
  if (target.matches("[data-action='reset-approval-filters']")) { state.approvalFilters={keyword:"",type:"全部类型",course:"全部课程"}; renderOps(); }
  if (target.matches("[data-action='apply-qualification-filters']")) { state.qualificationFilters={keyword:$("#qualificationKeyword")?.value.trim()||"",status:$("#qualificationStatus")?.value||"全部状态",package:$("#qualificationPackage")?.value||"全部课包",balance:$("#qualificationBalance")?.value||"全部次数"}; state.selectedQualifications.clear(); renderOps(); }
  if (target.matches("[data-action='reset-qualification-filters']")) { state.qualificationFilters={keyword:"",status:"全部状态",package:"全部课包",balance:"全部次数"}; state.selectedQualifications.clear(); renderOps(); }
  if (target.matches("[data-action='apply-child-user-filters']")) { state.childUserFilters={keyword:$("#childUserKeyword")?.value.trim()||"",relation:$("#childUserRelation")?.value||"全部关系状态",qualification:$("#childUserQualification")?.value||"全部资格状态",journey:$("#childUserJourney")?.value||"全部参与状态"}; renderOps(); }
  if (target.matches("[data-action='reset-child-user-filters']")) { state.childUserFilters={keyword:"",relation:"全部关系状态",qualification:"全部资格状态",journey:"全部参与状态"}; renderOps(); }
  if (target.closest(".directory-view-tabs")) { const label=target.textContent.trim(); state.childDirectoryView=label.includes("家庭")?"family":"child"; if(state.childDirectoryView==='child'){ renderOps(); } else { $$(".directory-view-tabs button").forEach((el,i)=>el.classList.toggle("active",i===1)); const groups={}; childUserRows.forEach(user=>{ const g=user.guardians.find(x=>x.role==='主账号')||user.guardians[0]; const key=g?.phone||g?.name||'待确认家庭'; (groups[key]??={guardian:g,children:[]}).children.push(user); }); const list=$(".child-directory-list"); if(list){ list.innerHTML=`<header><span>家庭 / 主账号</span><span>关联孩子</span><span>服务资格</span><span>参与情况</span><span>成长沉淀</span><span>操作</span></header>${Object.values(groups).map(group=>`<article class="family-directory-row"><div class="family-directory-owner"><span class="family-owner-avatar">${(group.guardian?.name||'家')[0]}</span><span><b>${group.guardian?.name||'待确认家庭'}</b><small>${group.guardian?.phone||'待补充联系方式'}</small><em>${group.children.length} 个孩子 · 主账号</em></span></div><div class="family-directory-children">${group.children.map(user=>`<button data-child-user="${user.studentId}"><i>${user.name[0]}</i><span><b>${user.name}</b><small>${user.studentId} · ${user.age}岁</small></span><em>${user.journey}</em></button>`).join('')}</div><div><span class="directory-status ${group.guardian?.qualification?.includes('有效')?'ok':'warn'}">${group.guardian?.qualification||'待确认'}</span><small>资格归属父母账号</small></div><div><b>${group.children.filter(user=>user.journey==='已结营').length} 个已结营</b><small>${group.children.filter(user=>user.journey!=='已结营').length} 个进行中/待参与</small></div><div><b>${group.children.reduce((sum,user)=>sum+user.completed,0)} 期</b><small>跨孩子累计成长记录</small></div><div class="child-directory-actions"><button class="primary" data-child-user="${group.children[0].studentId}">查看家庭详情</button></div></article>`).join('')}<footer><span>当前显示 <b>${Object.keys(groups).length}</b> 个家庭 · 关联 <b>${childUserRows.length}</b> 个孩子</span><div><button disabled>‹</button><button class="active">1</button><button disabled>›</button></div></footer>`; } } showToast(state.childDirectoryView==='family'?"已切换家庭视图":"已切换孩子视图",state.childDirectoryView==='family'?"按父母/监护人账号聚合查看服务资格与关联孩子":"按孩子 student_id 查看预约、履约和成长档案"); }
  if (target.matches("[data-child-user]:not([data-action])")) openChildUserDrawer(target.dataset.childUser);
  if (target.matches("[data-child-user-tab]")) openChildUserDrawer(state.selectedChildUserId,target.dataset.childUserTab);
  if (target.matches("[data-action='view-parent-account']")) showToast("已打开父母账号摘要","可继续查看该账号的服务资格、订单来源和关联孩子；敏感信息按权限展示");
  if (target.matches("[data-action='verify-guardian-relation']")) showToast("已进入关系核验","需核对监护关系证明与账号身份，完成后写入关系审计记录");
  if (target.matches("[data-action='view-child-growth']")) openChildUserDrawer(target.dataset.childUser||state.selectedChildUserId,"growth");
  if (target.matches("[data-action='view-child-audit']")) showToast("关系审计已定位","展示监护人新增、解绑、主账号变更及资料授权的完整历史");
  if (target.matches("[data-backend-growth-report]")) campReportPreviewDrawer();
  if (target.matches("[data-action='apply-session-filters']")) { state.sessionFilters={keyword:$("#sessionKeyword")?.value.trim()||"",status:$("#sessionStatus")?.value||"全部状态"}; renderOps(); }
  if (target.matches("[data-action='reset-session-filters']")) { state.sessionFilters={keyword:"",status:"全部状态"}; renderOps(); }
  if (target.matches("[data-reservation-view]")) { state.reservationView=target.dataset.reservationView; state.selectedReservations.clear(); renderOps(); }
  if (target.matches("[data-action='apply-reservation-filters']")) { state.reservationFilters={keyword:$("#reservationKeyword")?.value.trim()||"",course:$("#reservationCourse")?.value||"全部课程",session:$("#reservationSession")?.value||"全部营期",status:$("#reservationStatus")?.value||"全部状态",material:$("#reservationMaterial")?.value||"全部资料",entitlement:$("#reservationEntitlement")?.value||"全部权益"}; state.selectedReservations.clear(); renderOps(); }
  if (target.matches("[data-action='reset-reservation-filters']")) { state.reservationFilters={keyword:"",course:"全部课程",session:"全部营期",status:"全部状态",material:"全部资料",entitlement:"全部权益"}; state.reservationView="all"; state.selectedReservations.clear(); renderOps(); }
  if (target.matches("[data-action='select-all-reservations']")) { if(target.checked) reservationRows.forEach(r=>state.selectedReservations.add(r.id)); else state.selectedReservations.clear(); renderOps(); }
  if (target.matches("[data-action='batch-remind-reservations']")) { showToast("批量提醒已发送",`已向 ${state.selectedReservations.size} 个父母账号发送站内信，提醒记录已写入预约时间线`); state.selectedReservations.clear(); renderOps(); }
  if (target.matches("[data-action='remind-reservation']")) { showToast("提醒已发送","已通过站内信提醒父母完成参营确认或资料补充"); }
  if (target.matches("[data-reservation-id]")) reservationDetailDrawer(target.dataset.reservationId);
  if (target.matches("[data-action='reservation-to-approval']")) { closeDrawer(); state.opsPage="approvals"; renderOps(); showToast("已进入审批中心","当前申请对应的权益、营位和名单影响将在审批详情中展示"); }
  if (target.matches("[data-action='reservation-waitlist']")) { const r=reservationRows.find(item=>item.id===target.dataset.reservation); openDrawer(`<div class="drawer__head"><div><span class="eyebrow">候补管理 · ${r.id}</span><h2>${r.student} · ${r.session}</h2><span class="tag purple">${r.status}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>候补资源规则</h3><div class="reservation-resource-grid"><article><small>当前顺位</small><b>第 3 位</b><em>按进入时间排序</em></article><article><small>权益</small><b>未冻结</b><em>递补确认时再冻结</em></article><article><small>营位</small><b>不占正式营位</b><em>有空位才发起递补</em></article><article><small>时间冲突</small><b>允许存在</b><em>转正式时重新校验</em></article></div></section><section class="drawer-section"><h3>递补确认窗口</h3><p>获得营位后发送站内信并启动 24 小时倒计时；逾期自动放弃并通知下一位候补。</p></section>`); }
  if (target.matches("[data-action='reservation-open-session']")) { closeDrawer(); const r=reservationRows.find(item=>item.id===target.dataset.reservation); state.selectedSession=Math.max(0,campSessions.findIndex(s=>s.name===r?.session)); state.opsPage="sessionRoster"; renderOps(); }
  if (target.matches("[data-action='reservation-audit']")) showToast("操作审计已定位","将展示该预约的状态、权益、营位、资料和审批全量变更记录");
  if (target.matches("[data-action='apply-roster-filters']")) { state.rosterFilters={keyword:$("#rosterKeyword")?.value.trim()||"",status:$("#rosterStatus")?.value||"全部状态",group:$("#rosterGroup")?.value||"全部班级",material:$("#rosterMaterial")?.value||"全部资料状态"}; renderOps(); }
  if (target.matches("[data-action='reset-roster-filters']")) { state.rosterFilters={keyword:"",status:"全部状态",group:"全部班级",material:"全部资料状态"}; renderOps(); }
  if (target.matches("[data-ops-page]")) {
    state.opsPage=target.dataset.opsPage;
    renderOps();
    window.scrollTo({top:0,behavior:"auto"});
  }
  if (target.matches("[data-action='new-course']")) courseCreateModal();
  if (target.matches("[data-save-course]")) { const name=$("#courseName")?.value.trim(); if(!name){ showToast("请填写课程名称","课程名称为必填项"); $("#courseName")?.focus(); return; } const min=$("#courseAgeMin")?.value||"10"; const max=$("#courseAgeMax")?.value||"15"; const isPublished=target.dataset.saveCourse==='published'; const tagline=$("#courseTagline")?.value.trim(); const intro=$("#courseIntro")?.value.trim(); if(isPublished&&(!tagline||!intro)){ showToast("详情页内容尚未完整","发布前请填写成长价值副标题与课程介绍"); (!tagline?$("#courseTagline"):$("#courseIntro"))?.focus(); return; } const editingIndex=state.editingCourseIndex; const coursePayload={name,type:$("#courseType")?.value||"户外成长",age:`${min}–${max}岁`,package:$("#coursePackage")?.value||"暂未关联",theme:$("#courseTheme")?.value||"自然探索",tagline:tagline||"在真实体验中持续成长",intro}; if(Number.isInteger(editingIndex)){ const existing=state.courses[editingIndex]; state.courses[editingIndex]={...existing,...coursePayload,status:isPublished?"已发布":existing.status==="已发布"?"已发布":"草稿",detailStatus:isPublished?"已配置":existing.detailStatus||"待完善"}; } else { state.courses.unshift({id:`CRS-${String(state.courses.length+1).padStart(3,'0')}`,...coursePayload,sessions:0,status:isPublished?"已发布":"草稿",detailStatus:isPublished?"已配置":"待完善"}); } state.editingCourseIndex=null; closeModal(); state.opsPage="courses"; renderOps(); showToast(editingIndex!==null?"课程已更新":(isPublished?"课程与详情页已发布":"课程草稿已保存"),isPublished?"课程母版已发布；后续新建营期将继承最新默认规则":"课程草稿已保存，发布后才能创建营期"); }
  if (target.matches("[data-action='new-session']")) sessionCreateModal();
  if (target.matches("[data-action='new-session-for-course']")) { const sourceCourse=state.courses.find(course=>course.name===target.dataset.course); if(sourceCourse?.status!=="已发布"){ showToast("该课程尚未发布","只有已发布的X学院课程才能创建营期"); return; } if(!$("#drawerBackdrop").hidden) closeDrawer(); sessionCreateModal(target.dataset.course); }
  if (target.matches("[data-action='save-session']")) { const course=$("#sessionCourse")?.value; if(!course){ showToast("请先选择已发布课程","营期必须基于X学院课程创建"); return; } const sourceCourse=state.courses.find(item=>item.name===course); if(sourceCourse?.status!=="已发布"){ showToast("课程状态不可用","请返回课程管理完成发布后再创建营期"); return; } const name=$("#sessionName")?.value.trim()||`${course} · 第01期`; const city=$("#sessionCity")?.value.trim()||"待配置"; const start=$("#sessionStart")?.value||"2026-10-01"; const end=$("#sessionEnd")?.value||"2026-10-07"; campSessions.unshift({id:`CP-2026-${String(campSessions.length+1).padStart(3,'0')}`,course,name,dates:`${start.replaceAll('-','.')}–${end.slice(5).replaceAll('-','.')}`,city,status:"待配置",leader:"待分配",teachers:"待添加",assistants:"待添加",capacity:Number($("#sessionCapacity")?.value||30),confirmed:0,pageStatus:"待配置"}); sourceCourse.sessions+=1; closeModal(); state.opsPage="dashboard"; state.selectedSession=0; state.sessionConfigTab="basic"; renderOps(); setTimeout(()=>sessionConfigDrawer(0),80); showToast("营期已创建","已继承课程母版；请继续完成本期负责人、教师、助教、分组和专属页面配置"); }
  if (target.matches("[data-action='session-config']")) { state.sessionConfigTab="basic"; sessionConfigDrawer(Number(target.dataset.sessionIndex)); }
  if (target.matches("[data-action='session-enrollment']")) { state.selectedSession=Number(target.dataset.sessionIndex)||0; state.opsPage="sessionRoster"; renderOps(); }
  if (target.matches("[data-action='back-session-list']")) { state.opsPage="dashboard"; renderOps(); }
  if (target.matches("[data-session-config-tab]")) { state.sessionConfigTab=target.dataset.sessionConfigTab; sessionConfigDrawer(state.selectedSession); }
  if (target.matches("[data-action='open-grouping-config']")) { state.sessionConfigTab="grouping"; sessionConfigDrawer(state.selectedSession); }
  if (target.matches("[data-action='preview-auto-grouping']")) showToast("分组预览已更新","29名正式营员已按规则V3生成3个班组，当前无硬规则冲突");
  if (target.matches("[data-action='lock-session-roster']")) lockSessionRosterModal();
  if (target.matches("[data-action='confirm-lock-roster']")) { campSessions[state.selectedSession].status="名单锁定"; closeModal(); state.opsPage="sessionRoster"; renderOps(); showToast("名单已锁定并完成分组","正式名单、3个班组和指导师关系已同步营地执行端"); }
  if (target.matches("[data-action='view-group-snapshot']")) groupingSnapshotDrawer();
  if (target.matches("[data-action='request-regroup']")) regroupRequestModal(target.dataset.rosterIndex!==undefined?Number(target.dataset.rosterIndex):null);
  if (target.matches("[data-action='submit-regroup-request']")) { closeModal(); showToast("调班审批已提交","审批通过后更新班级、指导师/助教、班级群和未完成任务；原锁定快照保持不变"); }
  if (target.matches("[data-action='manual-group']")) manualGroupModal(target.dataset.rosterIndex!==undefined?Number(target.dataset.rosterIndex):null);
  if (target.matches("[data-action='confirm-manual-group']")) { const index=Number(target.dataset.rosterIndex); const row=sessionRosterRows[index]; if(row){row.group=$("#manualTargetGroup")?.value||"向日葵2班";row.mentor=row.group==="向日葵1班"?"陈毅北":row.group==="向日葵2班"?"周岚":"王森";} closeModal(); renderOps(); showToast("调班预览已更新","容量、师生比和重点关注约束已通过；名单锁定时写入正式分组快照"); }
  if (target.matches("[data-action='view-roster-person']")) rosterPersonDrawer();
  if (target.matches("[data-action='save-session-config']")) { closeDrawer(); showToast("营期配置已保存","负责人、教师、助教、规则参数、本期页面与播报配置均保留最新版本记录"); }
  if (target.matches("[data-action='edit-session-notice']")) sessionNoticeEditor();
  if (target.matches("[data-action='session-preview']")) { state.selectedSession=Number(target.dataset.sessionIndex)||0; sessionNoticePreview(state.selectedSession); }
  if (target.matches("[data-action='preview-session-notice']")) sessionNoticePreview();
  if (target.matches("[data-action='publish-session-notice']")) { closeDrawer(); showToast("开营通知已发布","已进入家长端“我的本期”，并通过站内信提醒已确认参营家庭"); }
  if (target.matches("[data-action='add-session-staff']")) sessionStaffPickerModal();
  if (target.matches("[data-action='back-session-team']")) { state.sessionConfigTab="team"; sessionConfigDrawer(state.selectedSession); }
  if (target.matches("[data-action='confirm-add-session-staff']")) { state.sessionConfigTab="team"; sessionConfigDrawer(state.selectedSession); showToast("人员已加入当前营期","已按营地助教角色分配班组、职责和最小必要权限"); }
  if (target.matches("[data-action='create-broadcast']")) campBroadcastEditor(target.dataset.broadcastType||"album");
  if (target.matches("[data-action='submit-broadcast-review']")) { closeModal(); showToast("播报已提交营长审核","审核通过后发布至家长端播报时间轴，并向对应班级群发送提醒"); }
  if (target.matches("[data-action='preview-broadcast-list']")) broadcastTimelineDrawer();
  if (target.matches("[data-action='generate-camp-reports']")) showToast("报告生成任务已创建","系统将补生成5份个人成长报告；缺少结营测评或评语的报告保持待确认状态");
  if (target.matches("[data-action='preview-camp-report']")) campReportPreviewDrawer();
  if (target.matches("[data-action='preview-class-report']")) showToast("班级总结报告已打开","可编辑班级成长主题、代表性故事和精选素材");
  if (target.matches("[data-action='report-statistics']")) showToast("营后统计已打开","包含徽章清单、满意度问卷结果和报告推送记录");
  if (target.matches("[data-action='publish-camp-report']")) { closeDrawer(); showToast("个人成长报告已推送","PDF已进入家长端成长档案，并通过站内信提醒父母查看"); }
  if (target.matches("[data-action='open-post-camp-session']")) postCampSessionDrawer();
  if (target.matches("[data-action='open-pre-assessment-monitor']")) preAssessmentMonitorDrawer();
  if (target.matches("[data-action='new-camp-task']")) campTaskEditor(true);
  if (target.matches("[data-action='edit-camp-task'],[data-action='camp-task-detail']")) campTaskEditor(false);
  if (target.matches("[data-action='save-camp-task']")) { closeModal(); showToast("营程任务已保存","发布营期后将按日期、班级和责任岗位生成每日任务"); }
  if (target.matches("[data-action='course-detail']")) { courseCreateModal(Number(target.dataset.courseIndex)); }
  if (target.matches("[data-action='course-page-config']")) coursePageConfigDrawer(Number(target.dataset.courseIndex));
  if (target.matches("[data-action='course-rules']")) courseRulesDrawer(Number(target.dataset.courseIndex));
  if (target.matches("[data-action='save-course-rules']")) { closeDrawer(); showToast("课程规则已保存","后续新建营期将继承默认规则；具体营期参数仍可单独配置"); }
  if (target.matches("[data-action='preview-course-detail']")) { if(!$("#drawerBackdrop").hidden) closeDrawer(); state.selectedCourse=target.dataset.courseKey||state.selectedCourse||"desert"; switchSystem("parent"); state.inCollege=true; state.appTab="heritage"; state.parentPage="courseDetail"; renderParent(); }
  if (target.matches("[data-action='view-growth']")) { state.inCollege=true; state.parentPage="growth"; renderParent(); }
  if (target.matches("[data-action='save-course-page']")) { closeDrawer(); showToast("课程详情页已发布","新版本已生效，历史预约仍保留原内容快照"); }
  if (target.matches("[data-camp-page]")) { state.campPage=target.dataset.campPage; renderCamp(); }
  if (target.matches("[data-camp-mode]")) { state.campMode=target.dataset.campMode; state.campPage="workbench"; renderCamp(); showToast("工作场景已切换",state.campMode==="college"?"当前展示X学院营期履约任务":"当前展示原有父母成长服务"); }
  if (target.matches("[data-camp-message-filter]")) { state.campMessageFilter=target.dataset.campMessageFilter; state.campPage="messages"; renderCamp(); }
  if (target.matches("[data-camp-task-filter]")) { state.campTaskFilter=target.dataset.campTaskFilter; state.campPage="tasks"; renderCamp(); }
  if (target.matches("[data-camp-person]")) { const name=target.dataset.campPerson; openDrawer(`<div class="drawer__head"><div><span class="eyebrow">新疆自然探索营 · 向日葵2班</span><h2>${name}</h2><span class="tag purple">${state.checkedIn.has(name)?'已到营':'待到营'}</span></div><button class="drawer__close" data-close-drawer>×</button></div><section class="drawer-section"><h3>营期执行资料</h3><div class="info-grid"><div class="info-item"><span>监护人</span><b>${name}妈妈</b></div><div class="info-item"><span>资料状态</span><b>已完成</b></div><div class="info-item"><span>交通安排</span><b>CZ6885 · 接站</b></div><div class="info-item"><span>住宿</span><b>A区 206</b></div></div></section><section class="drawer-section"><h3>健康与安全</h3><p>${name==='张小满'?'随身携带防晒药膏，使用前与监护人确认。':'暂无阻断项。敏感内容仅向当前必要岗位展示，查看行为自动留痕。'}</p></section><section class="drawer-section"><h3>营期记录</h3><p>签到、点名、成长记录、异常事件及家长沟通均按时间保留，不覆盖历史。</p></section>`); }
  if (target.matches("[data-action='switch-camp']")) showToast("营期切换","演示账号当前仅分配新疆自然探索营 · 第1期");
  if (target.matches("[data-action='switch-child']")) { state.child=state.child==="张小满"?"张小安":"张小满"; renderParent(); showToast("已切换服务对象",`当前为 ${state.child}；父母账号的 X学院权益保持不变`); }
  if (target.matches("[data-action='book']")) bookingModal(target.dataset.course);
  if (target.matches("[data-action='confirm-camp']")) confirmationModal();
  if (target.matches("[data-action='waitlist']")) waitlistModal();
  if (target.matches("[data-action='join-waitlist']")) { showToast("已加入候补","当前排第 4 位；候补状态允许时间重叠"); }
  if (target.matches("[data-action='unavailable']")) openModal(`<span class="eyebrow">不可预约</span><h2>当前课包不包含该课程</h2><p class="modal-lead">课程资格校验未通过。你仍有 3 次自然探索类权益，可预约新疆、东北、云南等课包覆盖课程。</p><div class="modal-actions"><button class="btn btn--primary" data-close-modal>我知道了</button></div>`);
  if (target.matches("[data-action='cancel']")) actionModal("cancel");
  if (target.matches("[data-action='reschedule'],[data-action='reschedule-conflict']")) actionModal("reschedule");
  if (target.matches("[data-action='change-camper']")) actionModal("change");
  if (target.matches("[data-action='trip-detail']")) tripDetailModal(target.dataset.tripType||"transport");
  if (target.matches("[data-growth-session-index]")) { state.growthSessionIndex=Number(target.dataset.growthSessionIndex)||0; state.inCollege=true; state.parentPage="growth"; renderParent(); }
  if (target.matches("[data-action='pre-camp-assessment']")) { if(state.preAssessmentComplete) preAssessmentResultDrawer(); else preCampAssessmentModal(); }
  if (target.matches("[data-action='submit-pre-assessment']")) { state.preAssessmentComplete=true; closeModal(); renderParent(); showToast("入营前六维测评已完成","成长基线已保存；开营时将固化版本，用于营后前后对比"); setTimeout(preAssessmentResultDrawer,120); }
  if (target.matches("[data-action='save-trip-material']")) { closeModal(); showToast("行程资料已更新","最新内容已同步至营地执行端并保留修改记录"); }
  if (target.matches("[data-action='request-material-change']")) { closeModal(); setTimeout(()=>actionModal("material"),80); }
  if (target.matches("[data-confirm-booking]")) { state.reservationStatus="待参营确认"; closeModal(); state.inCollege=true; state.parentPage="reservations"; renderParent(); showToast("预约成功","已冻结 1 次权益并预占 1 个营位"); }
  if (target.matches("[data-submit-confirmation]")) { if(!$("#agreementCheck")?.checked){showToast("请先同意规则","协议版本与确认时间需一并记录");return;} state.reservationStatus="已确认参营"; closeModal(); renderParent(); showToast("参营确认完成","营位已正式锁定，权益继续冻结"); }
  if (target.matches("[data-submit-request]")) { closeModal(); state.reservationStatus=({cancel:"取消申请中",reschedule:"改期申请中",change:"更换营员申请中",material:"资料变更申请中"})[target.dataset.requestType]||"申请处理中"; renderParent(); showToast("申请已提交","锁定后变更进入运营/主管审批"); }
  if (target.matches("[data-close-drawer]")) closeDrawer();
  if (target.matches("[data-approve]")) { state.approvals=state.approvals.filter(a=>a.id!==target.dataset.approve); renderOps(); showToast("审批已通过","状态、权益流水与审批意见已同步留痕"); }
  if (target.matches("[data-view-approval]")) { const a=state.approvals.find(x=>x.id===target.dataset.viewApproval); if(a) approvalDetailDrawer(a); }
  if (target.matches(".toggle")) target.classList.toggle("is-on");
  if (target.matches("[data-checkin]")) checkinReviewModal(target.dataset.checkin);
  if (target.matches("[data-action='confirm-person-checkin']")) { const name=state.pendingCheckinName; if(name==='林知夏'&&!$("#healthConfirm")?.checked){ showToast("请先完成健康事项确认","过敏或用药提醒属于签到前阻断项"); return; } state.checkedIn.add(name); closeModal(); state.campPage='checkin'; renderCamp(); showToast(`${name} 签到成功`,`资格正式核销并通知家长，时间 ${new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})}`); }
  if (target.matches("[data-action='scan-checkin']")) openModal(`<span class="eyebrow">扫码签到</span><h2>扫描营员签到码</h2><p class="modal-lead">扫码后仍会校验当前营期锁定名单、参营状态和健康阻断项。</p><div class="scanner-preview"><span></span><i>⌗</i><small>将签到码放入取景框</small></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消</button><button class="btn btn--primary" data-action="mock-scan-result">模拟识别张小满</button></div>`);
  if (target.matches("[data-action='mock-scan-result']")) { closeModal(); setTimeout(()=>checkinReviewModal('张小满'),80); }
  if (target.matches("[data-action='batch-checkin']")) batchCheckinModal();
  if (target.matches("[data-action='confirm-batch-checkin']")) { state.checkedIn.add('张小满'); state.checkedIn.add('王予安'); closeModal(); state.campPage='checkin'; renderCamp(); showToast("批量签到完成","2人校验通过并签到；1名健康阻断营员未处理"); }
  if (target.matches("[data-action='missing-arrival']")) missingArrivalModal();
  if (target.matches("[data-action='submit-missing-arrival']")) { closeModal(); showToast("未到营异常已提交","已通知营期负责人并进入交通异常跟踪"); }
  if (target.matches("[data-incident]")) incidentModal(target.dataset.incident);
  if (target.matches("[data-submit-incident]")) { closeModal(); showToast("异常已上报","已通知营长与医疗老师，进入处理闭环"); }
  if (target.matches("[data-action='save-growth']")) showToast("成长证据已保存","已关联当前 student_id 与营期");
  if (target.matches("[data-action='save-settings']")) showToast("营期规则已保存","配置变更将在下一次业务校验时生效");
  if (target.matches("[data-action='terminate-contract']")) openModal(`<span class="eyebrow">合同终止影响模拟</span><h2>系统将扫描 3 条关联预约</h2><div class="check-list"><div class="check-row"><i>✓</i><span><b>待参营确认 · 1 条</b><small>自动取消，释放营位和冻结权益</small></span><em class="tag green">自动处理</em></div><div class="check-row error"><i>!</i><span><b>已确认 / 锁定 · 1 条</b><small>转“合同异常待处理”，通知运营</small></span><em class="tag amber">人工处理</em></div><div class="check-row"><i>✓</i><span><b>已完成 · 1 条</b><small>历史履约保持不变</small></span><em class="tag">不变</em></div></div><div class="modal-actions"><button class="btn btn--outline" data-close-modal>取消模拟</button><button class="btn btn--danger" data-confirm-termination>确认模拟</button></div>`);
  if (target.matches("[data-confirm-termination]")) { closeModal(); showToast("合同终止事件已模拟","1 条预约转为合同异常待处理；历史未覆盖"); }
  if (target.matches("[data-action='extend-contract']")) showToast("合同延期已模拟","未使用权益有效期同步延长，已核销历史不变");
  if (target.matches("[data-action='retry-sync']")) showToast("无需重试","当前没有失败事件");
  if (target.matches("[data-action='offline']")) showToast("同步完成","2 条离线记录已安全上传");
  if (target.matches("[data-action='camp-broadcast']")) { state.campPage="broadcast"; renderCamp(); }
});

$("#modalBackdrop").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeModal(); });
$("#drawerBackdrop").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeDrawer(); });
document.addEventListener("keydown", (e) => {
  if (tourActive && e.key === "ArrowRight") { e.preventDefault(); if(tourIndex===activeTourSteps.length-1) endTour(true); else renderTourStep(tourIndex+1); return; }
  if (tourActive && e.key === "ArrowLeft") { e.preventDefault(); renderTourStep(tourIndex-1); return; }
  if (e.key === "Escape") { if(tourActive||$("#tourHub")) endTour(false); else { closeModal(); closeDrawer(); } }
});
window.addEventListener("resize",()=>{ if(tourActive) positionTourFocus(activeTourSteps[tourIndex].selector); });
document.addEventListener("change", (event) => {
  if (event.target.matches("[data-xorder-select]")) {
    if(event.target.checked) state.selectedXOrders.add(event.target.dataset.xorderSelect); else state.selectedXOrders.delete(event.target.dataset.xorderSelect);
    renderOps();
    return;
  }
  if (event.target.matches("[data-reservation-select]")) {
    if(event.target.checked) state.selectedReservations.add(event.target.dataset.reservationSelect); else state.selectedReservations.delete(event.target.dataset.reservationSelect);
    renderOps();
    return;
  }
  if (event.target.matches("#sessionCourse")) {
    const selected=state.courses.find(course=>course.name===event.target.value);
    const nameInput=$("#sessionName");
    if(selected && nameInput && (!nameInput.value || nameInput.value.includes("· 第"))) nameInput.value=`${selected.name} · 第01期`;
    return;
  }
  if (event.target.matches("#manualTargetGroup,#regroupTargetGroup")) {
    const groupMentors={"向日葵1班":"陈毅北","向日葵2班":"周岚","向日葵3班":"王森"};
    const group=event.target.value;
    const groupPreview=$("#targetGroupPreview");
    const mentorPreview=$("#targetMentorPreview");
    if(groupPreview) groupPreview.textContent=group;
    if(mentorPreview) mentorPreview.textContent=`${groupMentors[group]} · 孩子指导师`;
    return;
  }
  if (!event.target.matches("#modalContent .subproduct-picker input[type='checkbox']")) return;
  const labels=$$("#modalContent .subproduct-picker label");
  labels.forEach((label)=>{
    const checked=label.querySelector("input")?.checked;
    label.classList.toggle("selected",checked);
    const stateText=label.querySelector("em");
    if(stateText) stateText.textContent=checked?"已选择":"可选择";
  });
  const selected=labels.filter((label)=>label.querySelector("input")?.checked).length;
  const countText=$("#modalContent .order-compose-summary span:nth-of-type(2)");
  if(countText) countText.textContent=`${selected}个子产品`;
});
$("#themeToggle").addEventListener("click", () => { state.theme=state.theme==="light"?"dark":"light"; document.documentElement.dataset.theme=state.theme; localStorage.setItem("x-theme",state.theme); });

renderParent();
renderChild();
renderSCRM();
renderOps();
renderCamp();
// 评审确认：移除已取消的“徽章系统”，统一保留成长证据表述
function removeBadgeSystem(){
  document.querySelectorAll('.child-badge-strip,.child-me-page .child-me-stat-grid button:nth-of-type(2),.child-me-page .child-me-section:first-of-type button:nth-of-type(3)').forEach(el=>el.remove());
  document.querySelectorAll('.child-me-page .child-me-hero>i,.child-me-page .child-me-stat-grid button:first-of-type').forEach(el=>el.remove());
  document.querySelectorAll('.child-me-page button').forEach(button=>{ if(button.textContent.includes('我的成长证据') || button.textContent.includes('已经收集') || button.textContent.includes('账号与设备')) button.remove(); });
  document.querySelectorAll('.child-login-screen label').forEach(label=>{ if(!label.nextElementSibling?.classList.contains('child-invite-hint')) label.insertAdjacentHTML('afterend','<small class="child-invite-hint">演示邀请码：XM2026（由家长端开通后生成）</small>'); });
  document.querySelectorAll('.child-access-entry.is-enabled').forEach(card=>{ if(!card.querySelector('.child-space-entry')) card.insertAdjacentHTML('beforeend','<button class="child-space-entry" data-action="preview-child-app">进入孩子空间 <span>孩子端首页、任务、消息与成长记录 ›</span></button>'); });
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const nodes=[]; let node; while(node=walker.nextNode()) nodes.push(node);
  nodes.forEach(textNode=>{ if(textNode.nodeValue.includes('徽章')) textNode.nodeValue=textNode.nodeValue.replace(/徽章/g,'成长证据'); if(textNode.nodeValue.includes('成长成长证据')) textNode.nodeValue=textNode.nodeValue.replace(/成长成长证据/g,'成长证据'); if(textNode.nodeValue.includes('孩子')) textNode.nodeValue=textNode.nodeValue.replace(/孩子/g,'营员'); });
  document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(el=>['aria-label','title','placeholder'].forEach(attr=>{ const value=el.getAttribute(attr); if(value?.includes('孩子')) el.setAttribute(attr,value.replace(/孩子/g,'营员')); }));
}
new MutationObserver(removeBadgeSystem).observe(document.body,{childList:true,subtree:true});
removeBadgeSystem();
