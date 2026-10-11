document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  function openSidebar(){
    if(mobileSidebar){
      mobileSidebar.classList.remove("translate-x-full");
      mobileSidebar.classList.add("translate-x-0");
      mobileSidebar.setAttribute("aria-hidden","false");
    }
    if(sidebarBackdrop){
      sidebarBackdrop.classList.remove("opacity-0","pointer-events-none");
      sidebarBackdrop.classList.add("opacity-100","pointer-events-auto");
    }
    if(sidebarToggle) sidebarToggle.setAttribute("aria-expanded","true");
    document.body.style.overflow="hidden";
  }
  function closeSidebar(){
    if(mobileSidebar){
      mobileSidebar.classList.add("translate-x-full");
      mobileSidebar.classList.remove("translate-x-0");
      mobileSidebar.setAttribute("aria-hidden","true");
    }
    if(sidebarBackdrop){
      sidebarBackdrop.classList.add("opacity-0","pointer-events-none");
      sidebarBackdrop.classList.remove("opacity-100","pointer-events-auto");
    }
    if(sidebarToggle) sidebarToggle.setAttribute("aria-expanded","false");
    document.body.style.overflow="";
  }

  if(sidebarToggle) sidebarToggle.addEventListener("click", openSidebar);
  if(sidebarClose) sidebarClose.addEventListener("click", closeSidebar);
  if(sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeSidebar);
  window.addEventListener("keydown", (e)=>{
    if(e.key==="Escape"){
      closeSidebar();
      closeModal();
    }
  });
  if(mobileSidebar){
    mobileSidebar.querySelectorAll("a").forEach(a=> a.addEventListener("click", closeSidebar));
  }

  // Open badge WIB
  function updateOpenBadge(){
    const now = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Jakarta"}));
    const day = now.getDay(); //0 Sun
    const h = now.getHours() + now.getMinutes()/60;
    const isFriday = day===5;
    const isOpen = !isFriday && h>=9 && h<17;
    const badgeText = document.getElementById("openText");
    const badgeWrap = document.getElementById("openBadge");
    const live = document.getElementById("liveOpenText");
    let msg="", dotColor="";
    if(isFriday){ msg="Tutup hari ini (Jumat)"; dotColor="#f87171"; }
    else if(isOpen){ msg="Buka sekarang · tutup 17.00"; dotColor="#34d399"; }
    else if(h<9){ msg="Buka jam 09.00"; dotColor="#fbbf24"; }
    else { msg="Tutup · buka besok 09.00"; dotColor="#9ca3af"; }
    if(badgeText) badgeText.textContent = msg;
    if(badgeWrap){
      const dot = badgeWrap.querySelector("span");
      if(dot) dot.style.background = dotColor;
    }
    if(live){
      live.textContent = msg;
      live.className = "text-xs font-semibold mt-2 " + (isOpen ? "text-emerald-700" : isFriday ? "text-brick" : "text-muted");
    }
  }
  updateOpenBadge();

  // Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");
  function applyFilter(filter){
    filterBtns.forEach(b=>{
      const f=b.getAttribute("data-filter");
      const isActive=f===filter;
      b.classList.toggle("active",isActive);
      b.classList.toggle("bg-ink",isActive);
      b.classList.toggle("text-cream",isActive);
      b.classList.toggle("border-ink",isActive);
      if(!isActive){ b.classList.add("bg-paper"); b.classList.remove("bg-ink","text-cream","border-ink"); }
      else { b.classList.remove("bg-paper"); }
    });
    menuCards.forEach(card=>{
      const cat=card.getAttribute("data-cat");
      const show = filter==="all" || cat===filter;
      if(show){
        card.classList.remove("is-hidden");
        card.classList.add("is-entering");
        setTimeout(()=> card.classList.remove("is-entering"), 20);
      } else {
        card.classList.add("is-hidden");
        card.classList.remove("is-entering");
      }
    });
  }
  filterBtns.forEach(btn=>{
    btn.addEventListener("click", ()=> applyFilter(btn.getAttribute("data-filter")));
  });
  // count for "Semua"
  const countEl = document.querySelector("[data-count]");
  if(countEl) countEl.textContent = "· " + menuCards.length;

  // Scroll spy for nav links + sidebar
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const sideLinks = document.querySelectorAll(".sidebar-link");
  function onScrollSpy(){
    const pos = window.scrollY + 110;
    let current = "";
    sections.forEach(s=>{
      if(pos >= s.offsetTop) current = s.getAttribute("id");
    });
    navLinks.forEach(a=>{
      const href=a.getAttribute("href");
      const active = href === "#"+current;
      a.classList.toggle("is-active", active);
      a.classList.toggle("text-muted", !active);
    });
    sideLinks.forEach(a=>{
      const href=a.getAttribute("href");
      a.classList.toggle("is-active", href === "#"+current);
      a.classList.toggle("text-brick", href === "#"+current);
    });
  }
  window.addEventListener("scroll", onScrollSpy, {passive:true});
  onScrollSpy();

  // Data-open-menu (hero floating)
  document.querySelectorAll("[data-open-menu]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const cat=btn.getAttribute("data-cat");
      const target=document.getElementById("menu");
      if(target) target.scrollIntoView({behavior:"smooth"});
      if(cat) setTimeout(()=> applyFilter(cat), 400);
    });
  });

  // Modal
  const modal = document.getElementById("menuModal");
  const modalCard = document.getElementById("menuModalCard");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");
  const modalNotes = document.getElementById("modalNotes");
  const modalCat = document.getElementById("modalCat");
  const modalClose = document.getElementById("modalClose");
  const modalClose2 = document.getElementById("modalClose2");

  function openModalFromCard(card){
    if(!modal) return;
    const title=card.getAttribute("data-title")||"";
    const price=card.getAttribute("data-price")||"";
    const desc=card.getAttribute("data-desc")||"";
    const notes=card.getAttribute("data-notes")||"";
    const cat=card.getAttribute("data-cat")||"";
    const img=card.getAttribute("data-img")|| card.querySelector("img")?.src || "";
    if(modalImg){ modalImg.src=img; modalImg.alt=title; }
    if(modalTitle) modalTitle.textContent=title;
    if(modalPrice) modalPrice.textContent=price;
    if(modalDesc) modalDesc.textContent=desc;
    if(modalNotes) modalNotes.textContent=notes;
    if(modalCat) modalCat.textContent=cat;
    modal.classList.add("is-open");
    modal.classList.remove("opacity-0","pointer-events-none");
    modal.classList.add("opacity-100");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove("is-open","opacity-100");
    modal.classList.add("opacity-0","pointer-events-none");
    modal.setAttribute("aria-hidden","true");
    if(!mobileSidebar || mobileSidebar.classList.contains("translate-x-full")){
      document.body.style.overflow="";
    }
  }
  menuCards.forEach(card=>{
    card.addEventListener("click", ()=> openModalFromCard(card));
    card.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openModalFromCard(card);} });
    card.setAttribute("tabindex","0");
    card.setAttribute("role","button");
    card.setAttribute("aria-label","Lihat detail "+ (card.getAttribute("data-title")||"menu"));
  });
  if(modalClose) modalClose.addEventListener("click", closeModal);
  if(modalClose2) modalClose2.addEventListener("click", closeModal);
  if(modal) modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });

  // Carousel
  const scroller = document.getElementById("tScroller");
  const tPrev = document.getElementById("tPrev");
  const tNext = document.getElementById("tNext");
  function scrollT(dir){
    if(!scroller) return;
    const w = scroller.querySelector("figure")?.offsetWidth || 320;
    scroller.scrollBy({left: dir * (w + 16), behavior:"smooth"});
  }
  if(tPrev) tPrev.addEventListener("click", ()=> scrollT(-1));
  if(tNext) tNext.addEventListener("click", ()=> scrollT(1));

  // Reveal on scroll (progressive enhancement)
  const revealEls = document.querySelectorAll("#tentang > div, #menu > div, #fasilitas > div");
  revealEls.forEach((el,i)=>{
    el.classList.add("reveal");
    if(i%2===1) el.classList.add("reveal-delay-1");
  });
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  },{threshold:0.12, rootMargin:"0px 0px -40px 0px"});
  revealEls.forEach(el=> io.observe(el));
});
