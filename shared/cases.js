/* AMEI 現場實績：婚禮・尾牙頁與活動互動 APP 頁共用。
   新增一場：在 CASES 最上面加一筆，pages 寫要出現在哪一頁（'party' 婚禮・尾牙、'seaside' 活動互動 APP，可以兩個都寫）；照片放在 party/img/cases/<資料夾>/，路徑從網站根目錄寫起；最後的 1 代表直式照片。 */
const CASES = [
  {pages:['party','seaside'],
   title:'高雄女中校友會「三十而遇・四十重聚」回娘家', when:'2026.11.07', where:'高雄・宴會廳',
   desc:'校友先回母校「追憶巡禮」，在校內五個美拍地點拍照、加上互動貼紙與留言，照片即時上傳到晚宴會場的大螢幕照片牆；晚宴中再由大螢幕輪播、頒發趣味獎項。',
   tags:['校內定點拍照任務','照片裝飾與留言','大螢幕即時照片牆','趣味獎項輪播','專屬主視覺立牌'],
   dir:'party/img/cases/kghs-2026/',
   shots:[
     ['01-guide.webp','入口玩法立牌','四個步驟：掃碼加入、到定點拍照、裝飾留言、自動上傳會場。',1],
     ['02-entrance.webp','配合活動主視覺','立牌沿用校友會「三十而遇・四十重聚」的視覺，與現場布條一致。',1],
     ['03-sign.webp','宴會廳入口指引','晚宴才到的校友，在入口掃碼也能馬上加入。',1],
     ['04-wall.webp','大螢幕照片牆','校友在校園拍的照片與留言，即時出現在會場 LED 牆上，並顯示參加人數與照片數。'],
     ['05-control.webp','主持控制台','一台筆電接上會場螢幕，就能切換照片牆、放大單張照片、隱藏不適合的照片、播放大結局。'],
     ['06-award.webp','趣味獎項輪播','主持人一鍵放大單張照片，頒發「最佳青春熱血獎」等獎項。']
   ]}
];
function renderCases(el, root, page){
  const list = CASES.filter(c => !c.pages || c.pages.includes(page));
  el.innerHTML = list.map(c => `<article class="case reveal">
  <div class="case-hd"><h3>${c.title}</h3><span class="when">${c.when}・${c.where}</span></div>
  <p>${c.desc}</p><div class="tags">${c.tags.map(t => `<span>${t}</span>`).join('')}</div>
  <div class="shots">${c.shots.map(([f,t,d]) => `<a href="${root}${c.dir}${f}" target="_blank" rel="noopener" title="${t}：${d}"><img src="${root}${c.dir}${f}" alt="${t}：${d}" loading="lazy"><span>${t}</span></a>`).join('')}</div>
  <p class="case-note">點照片可以看大圖。畫面中的 QR code 與參加者照片已模糊處理。</p>
</article>`).join('');
}
