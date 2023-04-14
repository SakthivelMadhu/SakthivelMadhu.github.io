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

// send me mail 
const forms = document.getElementById("button");
forms.addEventListener("click" , (e) =>{
    e.preventDefault();
    alert("Message sent succesfully!")
})

// const resumeButton1 = document.getElementById("resume-button-1");
// resumeButton1.addEventListener("click", () => {
//     window.location.href='Sakthivel-Madhu-Resume.pdf'
//   const resumeLink1 = document.createElement("a");
//   resumeLink1.href = "Sakthivel-Madhu-Resume.pdf";
//   resumeLink1.target = "_blank";
//   resumeLink1.download = "Sakthivel-Madhu-Resume.pdf";
//   resumeLink1.click();
// });

// const resumeButton2 = document.getElementById("resume-button-2");
// resumeButton2.addEventListener("click", () => {
//     window.location.href='Sakthivel-Madhu-Resume.pdf'
//   const resumeLink2 = document.createElement("a");
//   resumeLink2.href = "Sakthivel-Madhu-Resume.pdf";
//   resumeLink2.target = "_blank";
//   resumeLink2.download = "Sakthivel-Madhu-Resume.pdf";
//   resumeLink2.click();
// });


// const url = "https://github-readme-stats.vercel.app/api?username=SakthivelMadhu&show_icons=true&count_private=true";
// fetch(url, { mode: 'no-cors' })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// const username = "SakthivelMadhu";

// // GitHub Calendar
// const calendarUrl = `https://api.github.com/users/${username}/events/public`;
// fetch(calendarUrl)
//   .then(response => response.json())
//   .then(data => {
//     const calendarDiv = document.querySelector('.github-calendar .calendar');
//     data.forEach(event => {
//       if (event.type === "PushEvent") {
//         const date = new Date(event.created_at).toLocaleDateString();
//         const html = `<span class="event" title="${date}"></span>`;
//         calendarDiv.insertAdjacentHTML('beforeend', html);
//       }
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Streak Stats
// const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${username}`;
// fetch(streakUrl)
//   .then(response => response.text())
//   .then(data => {
//     const streakCount = data.match(/<span class="streak-count">\d+<\/span>/)[0];
//     document.querySelector('.github-streak .streak-count').innerHTML = streakCount;
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Top Languages
// const languagesUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
// fetch(languagesUrl)
//   .then(response => response.json())
//   .then(data => {
//     let languages = {};
//     data.forEach(repo => {
//       const language = repo.language;
//       if (language) {
//         if (languages[language]) {
//           languages[language] += 1;
//         } else {
//           languages[language] = 1;
//         }
//       }
//     });
//     const sortedLanguages = Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
//     const languagesList = document.querySelector('.github-languages .languages-list');
//     sortedLanguages.slice(0, 6).forEach(language => {
//       const html = `<li>${language}</li>`;
//       languagesList.insertAdjacentHTML('beforeend', html);
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // GitHub Stats Card
// const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&count_private=true`;
// fetch(statsUrl)
//   .then(response => response.text())
//   .then(data => {
//     document.querySelector('.github-stats-card .stats-card').innerHTML = data;
//   })
//   .catch(error => {
//     console.error(error);
//   });
