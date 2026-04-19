// // ==================== Scroll Stack Effect ====================
// // بيضيف class "is-beneath" على كل section لما تبقى مدفوعة تحت

// document.addEventListener('DOMContentLoaded', () => {
//     const sections = document.querySelectorAll('.section-tab');

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (!entry.isIntersecting) {
//                 // لو السيكشن اختفت من الأعلى = اتغطت
//                 if (entry.boundingClientRect.top < 0) {
//                     entry.target.classList.add('is-beneath');
//                 }
//             } else {
//                 entry.target.classList.remove('is-beneath');
//             }
//         });
//     }, {
//         threshold: 0.1
//     });

//     sections.forEach(section => observer.observe(section));
// });
