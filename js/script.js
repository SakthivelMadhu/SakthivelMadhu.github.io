// typing animations 
var typed = new Typed(".typing" , {
    strings: [""  ,"Problem Solver" ,"Continuous Learner" ,"Java Backend Developer" , "Full Stack Web Developer" ] , 
    typeSpeed: 100,
    BackSpeed: 60,
    loop:true
})
// aside 
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length;
    allSection = document.querySelectorAll(".section") , 
    totalSection = allSection.length;

for(let i=0;i<totalNavList;i++){
    const a = navList[i].querySelector("a");
    a.addEventListener("click" , function() {
        // for(let i=0;i<totalSection;i++){
        //     allSection[i].classList.remove("back-section");
        // }
        removeBackSection();
        for(let j=0;j<totalNavList;j++){
            if(navList[j].querySelector("a").classList.contains("active")){
                addBackSection(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })    
}
function addBackSection(n){
    allSection[n].classList.add("back-section");
}
function removeBackSection(){
    for(let i=0;i<totalSection;i++){
        allSection[i].classList.remove("back-section");
    }
}
function showSection(e){
    for(let i=0;i<totalSection;i++){
        allSection[i].classList.remove("active");
    }
    const target = e.getAttribute("href").split("#")[1];
    // console.log(target)
    document.querySelector("#" + target).classList.add("active");
}
function updateNav(e){
    for(let i=0;i<totalNavList;i++){
        navList[i].querySelector("a").classList.remove("active");
        const target = e.getAttribute("href").split("#")[1];
        if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click" , function(){
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex); 
})
const navTogglerBtn = document.querySelector(".nav-toggler") , 
    aside = document.querySelector(".aside");
    navTogglerBtn.addEventListener("click" , () => {
        asideSectionTogglerBtn();
    })
function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i=0;i<totalSection;i++){
        allSection[i].classList.toggle("open");
    }
}


const forms = document.getElementById("button");
forms.addEventListener("click" , (e) =>{
    e.preventDefault();
    alert("Message sent succesfully!")
})