/* ===========================================================
   十二中吧 · 存档站点脚本
   =========================================================== */
(function () {
  'use strict';

  /* ---------- 2. 轻提示 ---------- */
  window.s17tip = function (text, ms) {
    var el = document.getElementById('s17Tip');
    if (!el) {
      el = document.createElement('div');
      el.id = 's17Tip';
      el.className = 'tip';
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.classList.remove('show'); }, ms || 2200);
  };

  /* ---------- 3. 站内搜索 ---------- */
  var INDEX = [
    {
      title: '【心情】明天我要去一个很远的地方',
      url: 't1003.html',
      meta: '十二中吧 · 2014-06-08 · 96 回复',
      snip: '明天我要去一个很远的地方。如果我回不来了，请你们帮我记住：<em>我不是自愿的</em>。',
      kw: ['周嘉晚', '雪野百里香', '香香', '明天', '很远', '自愿', '十一个', '十一', '11', '11楼', '失踪', '高三', '白马非马', '天沨不度']
    },
    {
      title: '【求助】找人：周嘉晚，高三(2)班',
      url: 't1017.html',
      meta: '十二中吧 · 2014-06-09 · 412 回复',
      snip: '周嘉晚，女，17 岁，滏阳市第十二中学高三(2)班。6 月 9 日早上没有到校……<em>在线等</em>。',
      kw: ['周嘉晚', '找', '找人', '失踪', '高三', '白马非马', '天沨不度', '钟雨笙不响', '9日', '6月']
    },
    {
      title: '【班务】黑板报内容投票（高三2班）',
      url: 't0884.html',
      meta: '十二中吧 · 2014-04-09 · 7 回复',
      snip: '我选了四首，抄在黑板上，投票选一首。别问为什么是这四首，问就是随便选的。',
      kw: ['黑板报', '投票', '诗', '班务', '高三2班', '天沨不度', '隔壁班路过', '47', '雪野百里香']
    },
    {
      title: '雪野百里香 的个人主页',
      url: 'u-xueye.html',
      meta: '用户中心 · 发帖 31 · 粉丝 12',
      snip: '签名档：<em>如果有人在找我，我在 47 号。</em>',
      kw: ['雪野百里香', '周嘉晚', '主页', '用户', '签名档', '47', '签到']
    },
    {
      title: '《滏阳日报》缩微胶片检索（2003 – 2005）',
      url: 'paper.html',
      meta: '外部资料 · 县图书馆数字化项目 · 报纸',
      snip: '县报缩微胶片已数字化，可按关键词检索版面。<em>2003 – 2005 年</em>。',
      kw: ['报纸', '滏阳日报', '县报', '缩微', '胶片', '新闻', '日报', '2003', '第二版']
    },
    {
      title: '雪野百里香 · 个人空间',
      url: 'space.html',
      meta: '外部站点 · 青柚空间快照 · 最后更新 2014-06-08',
      snip: '最后一条说说：2014-06-08 21:50。最近访客中，<em>cz</em> 于 2014-12-01 23:47 访问过。',
      kw: ['空间', '青柚空间', '说说', '访客', '留言板', '相册', '雪野百里香', 'cz']
    },
    {
      title: '我的照片 · 雪野百里香的空间相册',
      url: 'space-album.html',
      meta: '外部站点 · 青柚空间快照 · 共 6 张',
      snip: '其中一张上传于 2014-06-08 23:40，一分钟后的 23:41 被删除，无缩略图残留。',
      kw: ['相册', '照片', '空间', '删除了', '雪野百里香', '23:40']
    },
    {
      title: '【图楼】冬天的操场，随拍',
      url: 't1120.html',
      meta: '十二中吧 · 2014-11-28 · 9 回复',
      snip: '手机拍的，凑合看。翻相册翻出来的，去年跑操那天拍的。',
      kw: ['操场', '图楼', '跑操', '风', '歪脖子树', '隔壁班路过', '城南旧事', '照片']
    },
    {
      title: '【图片】毕业照终于拍了',
      url: 't0520.html',
      meta: '十二中吧 · 2014-05-20 · 22 回复',
      snip: '晒了一上午，眼睛都睁不开。教务处拍的，说是要挂到校史室去。',
      kw: ['毕业照', '图片', '椅子', '拍照', '城南旧事', '校史室', '照片']
    },
    {
      title: '【图楼】明天高考，教室空了',
      url: 't0607.html',
      meta: '十二中吧 · 2014-06-07 · 6 回复',
      snip: '桌子全搬到走廊上去了，教室空得吓人。拍一张，留个念。',
      kw: ['教室', '图楼', '高考', '桌子', '走廊', '钟雨笙不响', '白马非马', '照片']
    },
    {
      title: '聊天记录导出（白马非马）',
      url: 'chat.html',
      meta: '外部资料 · 2014-06-08 · 保留 36 条',
      snip: '「十一年前也有人这么走过」「张叔知道。他今天下午在校门口跟我说的」',
      kw: ['聊天记录', '聊天', 'QQ', '白马非马', '雪野百里香', '张叔', '张守义', '能看见海', '海', '21:47']
    },
    {
      title: '白马非马 的个人主页',
      url: 'u-baima.html',
      meta: '用户中心 · 等级 8 · 发帖 269 · 连续签到 282 天',
      snip: '签名档：<em>你回来的时候，我还在这儿。</em>',
      kw: ['白马非马', '白马', '主页', '用户', '签到', '282', '找', '找人', '周嘉晚', '最后一条发言']
    },
    {
      title: '天沨不度 的个人主页',
      url: 'u-tianfeng.html',
      meta: '用户中心 · 等级 7 · 发帖 268 · 收藏 1',
      snip: '签名档：<em>没什么好说的。天涯何处无芳草。</em> ｜ TA 的收藏：有人认识陈知遥吗（收藏于 2014-06-09 00:20）',
      kw: ['天沨不度', '天沨', '班长', '主页', '用户', '收藏', '陈知遥', '没什么好说的', '天涯何处无芳草', '天涯', '芳草', '签到']
    },
    {
      title: '钟雨笙不响 的个人主页',
      url: 'u-zhong.html',
      meta: '用户中心 · 等级 6 · 发帖 223',
      snip: '签名档：<em>潜水。</em>',
      kw: ['钟雨笙不响', '钟雨笙', '主页', '用户', '潜水', '签到', '张师傅']
    },
    {
      title: 'cz 的个人主页',
      url: 'user-cz.html',
      meta: '用户中心 · 小吧主 · 发帖 2 条',
      snip: '签名档：<em>我不在这里。</em>',
      kw: ['cz', '小吧主', '吧务', '2004', '主页', '用户']
    },
    {
      title: '【闲聊】门口那个看门的张师傅是不是要退休了',
      url: 't0301.html',
      meta: '十二中吧 · 2014-10-14 · 14 回复',
      snip: '张守义。门卫室墙上那个牌子写的。他记性好得吓人，我们班五十多号人，他基本都叫得出名字。',
      kw: ['张守义', '张师傅', '门卫', '看门', '门卫室', '登记本', '入职', '值班', '钟雨笙不响', '城南旧事', '刚来的一只猫']
    },
    {
      title: '【求助】高一新生，问几个生活问题',
      url: 't0402.html',
      meta: '十二中吧 · 2013-09-06 · 18 回复',
      snip: '自己去吧内搜。搜个人名就行，<em>陈知遥</em>。—— 搜了，就一个帖子，还被删得只剩标题了……',
      kw: ['陈知遥', '新生', '高一', '宿舍', '热水', '后门', '半夜', '查寝', '搜', '隔壁班路过', '城南旧事']
    },
    {
      title: '【讨论】咱吧的老帖子是不是该整理一下',
      url: 't0503.html',
      meta: '十二中吧 · 2014-08-03 · 11 回复',
      snip: '有的连「已删除」都不显示，楼号直接跳过去。　@cz 吧务还在吗',
      kw: ['cz', '老帖', '整理', '吧务', '删除', '跳号', '置顶', '城南旧事', '钟雨笙不响']
    },
    {
      title: '【闲聊】有人认识陈知遥吗',
      url: 't0000.html',
      meta: '十二中吧 · 2004-09-02 · 源站仅存 2 层',
      snip: '陈知遥，女，2003 届高三(1)班，去年夏天毕业前走的。',
      kw: ['滏阳老张', '老张', '陈知遥', '知遥', '2004', '2003', '看门', 'cz']
    }
  ];

  var DEAD_POOL = [
    { title: '【求助】谁知道高三什么时候放暑假', meta: '十二中吧 · 2014-06-10', snip: '该结果已被删除，无缓存。' },
    { title: '找一个人，姓周，女生，十七岁', meta: '十二中吧 · 2014-07-21', snip: '该结果已被删除，无缓存。' },
    { title: '【图楼】6月8日晚上滏阳河边拍到的猫', meta: '十二中吧 · 2014-06-08', snip: '该结果已被删除，无缓存。' },
    { title: '【求助】火车站凌晨有没有去南边的车', meta: '十二中吧 · 2014-06-07', snip: '该结果已被删除，无缓存。' }
  ];

  function doSearch(q) {
    var box = document.getElementById('sResults');
    var head = document.getElementById('sHead');
    if (!box) return;
    q = (q || '').trim();
    box.innerHTML = '';
    if (!q) {
      if (head) head.textContent = '输入关键词，搜索本吧存档内容';
      return;
    }

    var lower = q.toLowerCase();
    var hits = INDEX.filter(function (it) {
      return it.kw.some(function (k) {
        return lower.indexOf(k.toLowerCase()) > -1 || k.toLowerCase().indexOf(lower) > -1;
      });
    });
    var dead = DEAD_POOL.slice(0, 2);
    // 未归类条目：搜到作者账号时，索引里会多出一样不属于这里的东西
    var egg = /zzy6/i.test(q);

    if (head) {
      head.innerHTML = '搜索 “<b>' + esc(q) + '</b>” 的结果：共找到 ' + (hits.length + dead.length + (egg ? 1 : 0)) +
        ' 条，其中 <b>' + dead.length + '</b> 条已损坏。';
    }

    hits.forEach(function (it) {
      var d = document.createElement('div');
      d.className = 'sresult';
      d.innerHTML =
        '<div class="st"><a href="' + it.url + '">' + it.title + '</a></div>' +
        '<div class="su">' + it.meta + '</div>' +
        '<div class="ss">' + it.snip + '</div>';
      box.appendChild(d);
    });

    dead.forEach(function (it) {
      var d = document.createElement('div');
      d.className = 'sresult dead';
      d.innerHTML =
        '<div class="st">' + it.title + '</div>' +
        '<div class="su">' + it.meta + '</div>' +
        '<div class="ss">' + it.snip + '</div>';
      box.appendChild(d);
    });

    if (egg) {
      var g = document.createElement('div');
      g.className = 'sresult egg';
      g.innerHTML =
        '<div class="st"><a href="zzy6.html">【未归类】zzy6</a></div>' +
        '<div class="su">网页时光机 · 未归类条目 · 不属于本吧</div>' +
        '<div class="ss">这条记录和十二中吧没有任何关系。<br>但它出现在了这个索引里。</div>';
      box.appendChild(g);
    }

    if (!hits.length && !egg) {
      var e = document.createElement('div');
      e.className = 'sempty';
      e.innerHTML = '没有找到与 “' + esc(q) + '” 相关的<b>可用</b>结果。<br>' +
        '<span style="font-size:11px">存档损坏率较高，试试更早的时间，或者换个说法。</span>';
      box.appendChild(e);
    }
  }

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  window.s17search = function (e) {
    if (e) e.preventDefault();
    var input = document.getElementById('sInput');
    if (!input) return false;
    var q = input.value.trim();
    if (!q) { input.focus(); return false; }
    var url = 'search.html?q=' + encodeURIComponent(q);
    if (document.getElementById('sResults')) {
      // 已在搜索页：原地出结果，不跳转
      try { history.replaceState(null, '', url); } catch (err) {}
      doSearch(q);
    } else {
      // 其他页面：直接跳到搜索页
      location.href = url;
    }
    return false;
  };

  function initSearch() {
    var input = document.getElementById('sInput');
    if (!input) return;
    var q = '';
    try {
      var m = /[?&]q=([^&]*)/.exec(location.search);
      if (m) q = decodeURIComponent(m[1].replace(/\+/g, ' '));
    } catch (err) {}
    if (q) { input.value = q; }
    doSearch(q);
  }

  /* ---------- 4. 未解锁的翻页 / 死链 ---------- */
  function initDeadLinks() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-dead]') : null;
      if (!a) return;
      e.preventDefault();
      s17tip(a.getAttribute('data-dead') || '该数据已损坏，无法打开');
    });
  }

  /* ---------- 5. 控制台彩蛋 ---------- */
  function initConsole() {
    if (!window.console) return;
    console.log('%c十二中吧 · 网页存档', 'color:#2b5a9e;font-weight:bold;font-size:14px');
    console.log('%c快照编号 S17-20150317-0031', 'color:#8a8a8a');
    console.log('存档备注：本快照为只读镜像，缺失区域以占位符标记。');
    console.log('如果你在找一样不存在的东西 —— 试试搜索框。');
    console.log('如果你也在找一个人 —— 她说过她要去很远的地方。');
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initSearch();
    initDeadLinks();
    initConsole();
  });
})();

/* ===========================================================
   阶段二 · 密码门 / 数据恶化 / 输入留痕
   =========================================================== */
(function () {
  'use strict';

  var K_DREAD = 's17.dread';
  var K_ATT = 's17.attempts';
  var K_OPEN = 's17.opened';
  var K_RET = 's17.retrieve';

  /* ---------- 简易校验哈希（不可逆，仅用于避免答案明文出现在源码里） ---------- */
  function s17hash(s) {
    var str = 's17::' + String(s == null ? '' : s).trim().toLowerCase().replace(/[\s\u3000]+/g, '');
    var h1 = 0x811c9dc5 >>> 0, h2 = 0x1000193 >>> 0;
    for (var i = 0; i < str.length; i++) {
      var c = str.charCodeAt(i);
      h1 ^= c; h1 = Math.imul(h1, 16777619) >>> 0;
      h2 = Math.imul(h2 ^ (c + i), 2654435761) >>> 0;
    }
    return h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0');
  }

  /* ---------- 存储小工具 ---------- */
  function load(k, d) {
    try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; }
  }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function jload(k, d) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; }
  }
  function jsave(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- 已解锁的门 ---------- */
  function opened(id) { var o = jload(K_OPEN, {}); return !!o[id]; }
  function unlock(id) {
    var o = jload(K_OPEN, {});
    if (!o[id]) { o[id] = 1; jsave(K_OPEN, o); bumpDread(); }
  }
  function bumpDread() {
    var n = Math.min(3, (parseInt(load(K_DREAD, '0'), 10) || 0) + 1);
    save(K_DREAD, String(n));
    applyDread();
  }
  function applyDread() {
    var n = parseInt(load(K_DREAD, '0'), 10) || 0;
    if (n > 0) document.body.setAttribute('data-dread', String(n));
  }

  /* ---------- 输入留痕：页面会记住你输入过的一切 ---------- */
  function logAttempt(field, value, ok) {
    var a = jload(K_ATT, []);
    a.push({ f: field, v: String(value), ok: !!ok, t: Date.now() });
    if (a.length > 60) a = a.slice(-60);
    jsave(K_ATT, a);
  }
  function renderTape(el, field) {
    if (!el) return;
    var a = jload(K_ATT, []).filter(function (x) { return !field || x.f === field; });
    if (!a.length) {
      el.innerHTML = '<div class="th">本页记录了您输入的一切</div><div class="empty">（暂无记录）</div>';
      return;
    }
    var li = a.map(function (x) {
      var t = new Date(x.t);
      var hh = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
      var cls = x.ok ? 'r' : 'd';
      var tail = x.ok ? '　√ 通过' : '　× 未通过';
      return '<li class="' + cls + '">' + esc(x.v || '（空）') + '<span style="color:#c6ccd4">' + tail + '</span>' +
        '<span style="color:#d3d9e0;font-size:11px">　' + hh + '</span></li>';
    }).join('');
    el.innerHTML = '<div class="th">本页记录了您输入的一切（共 ' + a.length + ' 条）</div><ul>' + li + '</ul>';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- 门定义（答案只存哈希） ---------- */
  var GATES = {
    '47': {
      title: '第 47 号',
      q: '四月那期黑板报，她投的那一票，写法跟别人都不一样。',
      hashes: ['082ec3514dda2272', '703031c4e24c982e'],
      ok: '门开了。',
      then: 't0203.html',
      hint: '四月那次投票，票面上写的是位置，不是数目。'
    },
    'zhang': {
      title: '看门的人',
      q: '2014 年 6 月 8 日夜里，有人在 11 楼说了一句话，然后连楼带人一起没了。<br>' +
         '他 2004 年就在这个吧里，在十二中门口看了十几年的门。<br>' +
         '他叫什么名字？',
      hashes: ['0b9c917d2b223a93', '6b680df9bbe2e4af'],
      ok: '核对通过。他的账号已经被注销了，但私信记录还在。',
      then: 'mail.html',
      hint: '2003 年 6 月那份县报，第二版左下角有个豆腐块。'
    },
    'beihai': {
      title: '能看见海的地方',
      q: '老张删掉的那句话说得很清楚：往南走，一直走到能看见海的地方。<br>' +
         '把那段信号听出来。',
      hashes: ['85f1ade458931289', '9f7b64a098a2002d'],
      ok: '对。就是这里。',
      then: 'final.html',
      hint: '那段信号是重复播的，听三遍。'
    }
  };

  function initGate() {
    var box = document.getElementById('gateBox');
    if (!box) return;
    var m = /[?&]g=([^&]*)/.exec(location.search);
    var id = m ? decodeURIComponent(m[1]) : '';
    var g = GATES[id];
    var host = document.getElementById('gateHost');
    var tape = document.getElementById('gateTape');

    if (!g) {
      host.innerHTML = '<div class="gatebox"><h3>门不存在</h3>' +
        '<div class="q">这个编号没有任何记录。<a href="index.html">回到十二中吧</a></div></div>';
      return;
    }
    document.title = g.title + '_十二中吧_网页存档';

    if (opened(id)) {
      host.innerHTML = '<div class="gatebox"><h3>' + esc(g.title) + '</h3>' +
        '<div class="gatemsg ok">这扇门你已经开过了。</div>' +
        '<div style="margin-top:16px"><a class="btn primary" href="' + g.then + '">继续 →</a></div></div>';
      renderTape(tape, id);
      return;
    }

    host.innerHTML =
      '<div class="gatebox">' +
      '<h3>' + esc(g.title) + '</h3>' +
      '<div class="q">' + g.q + '</div>' +
      '<div class="row">' +
      '<input type="text" id="gateInput" autocomplete="off" spellcheck="false" placeholder="输入答案（中文或拼音均可）">' +
      '<button id="gateBtn">确 认</button>' +
      '</div>' +
      '<div class="gatemsg" id="gateMsg"></div>' +
      '<div class="gate-foot">' +
      '存档备注：这一段数据在源站是被主动抹除的，本快照只能凭残留片段核对。' +
      '</div>' +
      '</div>' +
      '<div class="tape" id="gateTape"></div>';

    var input = document.getElementById('gateInput');
    var btn = document.getElementById('gateBtn');
    var msg = document.getElementById('gateMsg');
    function submit() {
      var v = input.value.trim();
      if (!v) { msg.className = 'gatemsg bad'; msg.textContent = '什么都没输入。'; return; }
      var h = s17hash(v);
      if (g.hashes.indexOf(h) > -1) {
        logAttempt(id, v, true);
        unlock(id);
        msg.className = 'gatemsg ok';
        msg.innerHTML = esc(g.ok) + '<div style="margin-top:12px"><a class="btn primary" href="' + g.then + '">继续 →</a></div>';
        btn.disabled = true; input.disabled = true;
        renderTape(tape, id);
      } else {
        logAttempt(id, v, false);
        renderTape(tape, id);
        msg.className = 'gatemsg bad';
        msg.textContent = '不对。';
      }
    }
    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    input.focus();
    renderTape(tape, id);
  }

  /* ---------- 县报检索（不限次数） ---------- */
  function initRetrieve() {
    var box = document.getElementById('retBox');
    if (!box) return;
    var input = document.getElementById('retInput');
    var btn = document.getElementById('retBtn');
    var msg = document.getElementById('retMsg');
    var quotaEl = document.getElementById('retQuota');
    var state = jload(K_RET, { hit: 0 });

    function paint() {
      if (state.hit) {
        quotaEl.innerHTML = '检索：<b style="color:#2f7d4f">已命中</b>　·　2003-06-12 第二版已展开';
      } else {
        quotaEl.innerHTML = '检索：<b>不限次数</b>';
      }
    }
    paint();

    function run() {
      var v = input.value.trim();
      if (!v) return;
      var hit = v.indexOf('陈知遥') > -1 || v.indexOf('知遥') > -1 || v.indexOf('十二中') > -1 ||
                v.indexOf('女生') > -1 || v.indexOf('离家') > -1 || v.indexOf('未归') > -1 ||
                v.indexOf('陈') > -1;
      logAttempt('retrieve', v, hit);
      if (hit) {
        state.hit = 1; jsave(K_RET, state); paint();
        msg.className = 'gatemsg ok';
        msg.textContent = '命中 1 条：2003-06-12 第二版。';
        var p = document.getElementById('retResult');
        if (p) { p.style.display = 'block'; p.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      } else {
        msg.className = 'gatemsg bad';
        msg.textContent = '没有找到相关版面。';
      }
      renderTape(document.getElementById('retTape'), 'retrieve');
    }
    btn.addEventListener('click', run);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') run(); });
    renderTape(document.getElementById('retTape'), 'retrieve');
    if (state.hit) {
      var p = document.getElementById('retResult'); if (p) p.style.display = 'block';
      msg.className = 'gatemsg ok'; msg.textContent = '命中 1 条：2003-06-12 第二版。';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyDread();
    initGate();
    initRetrieve();
  });

  window.s17hash = s17hash;
  window.s17unlock = unlock;
  window.s17bumpDread = bumpDread;
})();


/* ===========================================================
   门卫登记管理系统 · 登录门
   账号 = 老张在吧里的 ID（滏阳老张）
   密码 = 20030608（2003-06-08，他这辈子忘不了的那一天）
   =========================================================== */
(function () {
  'use strict';

  var K_GH = 's17.gh';
  var K_GHTRY = 's17.gh.try';

  // 账号：张守义 / zhangshouyi（本系统用真名，不用网名）
  // 也放行 滏阳老张 / fuyanglaozhang，避免玩家按旧思路卡死
  var OK_USER = ['0b9c917d2b223a93', '6b680df9bbe2e4af',
                 'bcb34689fb79c785', 'f51eb24488b468c9'];
  var OK_PASS = '9ffe3fcbc88ebf83';                      // 20030608

  function h(s) {
    if (window.s17hash) return window.s17hash(s);
    return '';
  }
  function ls(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function buildLogin(sys) {
    var box = document.createElement('div');
    box.className = 'ghlogin';
    box.id = 'ghLogin';
    box.innerHTML =
      '<div class="h">滏阳市第十二中学<small>门卫登记管理系统 · 值班人员登录</small></div>' +
      '<div class="b">' +
        '<div class="f"><label>值班账号</label>' +
          '<input type="text" id="ghUser" autocomplete="off" spellcheck="false" placeholder="请输入值班账号"></div>' +
        '<div class="f"><label>密码</label>' +
          '<input type="password" id="ghPass" autocomplete="off" placeholder="请输入密码"></div>' +
        '<div class="showline"><label style="display:inline;font-size:11.5px;color:#8c8c8c;margin:0">' +
          '<input type="checkbox" id="ghShow"> 显示密码</label></div>' +
        '<button id="ghBtn">登 录</button>' +
        '<div class="msg" id="ghMsg"></div>' +
        '<div class="foot">' +
          '本系统由校保卫科维护　·　账号为本人姓名，支持姓名全拼<br>' +
          '上次登录：2015-03-16 23:58　操作员：张守义<br>' +
          '<span style="color:#b0b0b0">账号提示：本系统不认网名。</span><br>' +
          '<span style="color:#b0b0b0">密码提示：这一天，我这辈子忘不了。（八位数字）</span>' +
        '</div>' +
      '</div>';
    sys.parentNode.insertBefore(box, sys);

    var u = document.getElementById('ghUser');
    var p = document.getElementById('ghPass');
    var btn = document.getElementById('ghBtn');
    var msg = document.getElementById('ghMsg');
    var show = document.getElementById('ghShow');

    show.addEventListener('change', function () {
      p.type = show.checked ? 'text' : 'password';
    });

    var fails = parseInt(ls(K_GHTRY, '0'), 10) || 0;

    function submit() {
      var uv = u.value.trim();
      var pv = String(p.value).replace(/[^0-9]/g, '');
      if (!uv) { msg.className = 'msg bad'; msg.textContent = '请输入值班账号。'; u.focus(); return; }
      if (!pv) { msg.className = 'msg bad'; msg.textContent = '请输入密码。'; p.focus(); return; }

      if (OK_USER.indexOf(h(uv)) > -1 && h(pv) === OK_PASS) {
        lset(K_GH, '1');
        msg.className = 'msg ok';
        msg.textContent = '登录成功，正在载入…';
        box.parentNode.removeChild(box);
        sys.style.display = '';
      } else {
        fails++;
        lset(K_GHTRY, String(fails));
        msg.className = 'msg bad';
        msg.textContent = fails >= 3
          ? '账号或密码错误。（本系统已记录第 ' + fails + ' 次尝试）'
          : '账号或密码错误。';
        p.value = '';
        p.focus();
      }
    }

    btn.addEventListener('click', submit);
    u.addEventListener('keydown', function (e) { if (e.key === 'Enter') p.focus(); });
    p.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    u.focus();
  }

  function initGatehouse() {
    var sys = document.getElementById('ghSystem');
    if (!sys) return;

    var out = document.getElementById('ghLogout');
    if (out) {
      out.addEventListener('click', function (e) {
        e.preventDefault();
        lset(K_GH, '');
        location.reload();
      });
    }

    if (ls(K_GH, '') === '1') { sys.style.display = ''; return; }
    sys.style.display = 'none';
    buildLogin(sys);
  }

  document.addEventListener('DOMContentLoaded', initGatehouse);
})();
