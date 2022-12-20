const layout = `<div class="not-found__content">
<h1 class="not-found__title">Тур по заданным параметрам не найден</h1>
<div class="not-found__available">
	<strong>Попробуйте следующее:</strong>
	<div class="not-found__row">
		<span>&bull; Выберите <strong>другие даты</strong>, нажав галочку &plusmn;3&nbsp;дня с&nbsp;даты вылета</span>
		<div class="not-found__mini-card">&plusmn;3&nbsp;дня</div>
	</div>
	<div class="not-found__row">
		<span>&bull; Выберите <strong>несколько вариантов длительности</strong> тура</span>
		<img src="https://cdn.coral.ru/content/insider/russia/404/table.png" alt="" />
	</div>
	<div class="not-found__row">
		<span>&bull; Позвоните нам и&nbsp;<strong>мы поможем подобрать тур</strong></span>
		<div>
			<a href="tel:+74952321206">+7&nbsp;(495)&nbsp;232&nbsp;12&nbsp;06</a>
			<span>Колл-центр&nbsp;24/7</span>
		</div>
	</div>
	<div class="not-found__row">
		<span>&bull; Свяжитесь с&nbsp;нами в&nbsp;социальных сетях</span>
		<div class="not-found__social">
			<a href="https://t.me/coraltravel_telegrambot" class="tg">&nbsp;</a>
			<a href="https://wa.me/74952321206?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!" class="wa">&nbsp;</a>
			<a href="https://vk.me/coraltravel" class="vk">&nbsp;</a>
			<a href="https://bcrw.apple.com/urn:biz:d3809fd0-e2fe-4027-b27e-ae34bf28e38c" class="msg">&nbsp;</a>
		</div>
	</div>
</div>
<a href="/" class="not-found__button">Перейти на главную</a>
</div>
<img src="https://cdn.coral.ru/content/insider/russia/404/img.png" alt="" class="not-found__img desktop" />
<img src="https://cdn.coral.ru/content/insider/russia/404/img_mobile.png" alt="" class="not-found__img mobile" />`;
const styles = `
<style>
@media screen and (max-width: 768px) {
	.desktop {
	  display: none !important;
	}
  }
  
  .mobile {
	width: 100%;
  }
  @media screen and (min-width: 769px) {
	.mobile {
	  display: none !important;
	}
  }
  
  .not-found {
	border-radius: 20px;
	background: #fff;
	display: flex;
	padding: 0 !important;
  }
  @media screen and (max-width: 1006px) {
	.not-found {
	  flex-direction: column;
	}
  }
  
  .not-found__content {
	padding: 40px;
	display: flex;
	flex-direction: column;
	row-gap: 40px;
  }
  @media screen and (max-width: 1006px) {
	.not-found__content {
	  order: 2;
	  row-gap: 20px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__content {
	  row-gap: 10px;
	  align-items: center;
	  padding: 20px;
	}
  }
  
  .not-found__available {
	display: flex;
	flex-direction: column;
	row-gap: 25px;
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 1.2;
	color: #000;
  }
  @media screen and (max-width: 1006px) {
	.not-found__available {
	  font-size: 24px;
	  row-gap: 15px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__available {
	  width: 100%;
	  font-size: 12px;
	  row-gap: 5px;
	}
  }
  
  .not-found__title {
	margin: 0;
	font-style: normal;
	font-weight: 600;
	font-size: 40px;
	line-height: 1.2;
	max-width: 460px;
	color: #000;
  }
  @media screen and (max-width: 1006px) {
	.not-found__title {
	  max-width: 100%;
	  font-size: 45px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__title {
	  display: block !important;
	  width: 80%;
	  align-self: flex-start;
	  font-size: 22px;
	}
  }
  
  .not-found__img {
	-o-object-fit: cover;
	   object-fit: cover;
	max-width: 50%;
	border-radius: 20px;
  }
  @media screen and (max-width: 1006px) {
	.not-found__img {
	  max-width: 100%;
	  order: 1;
	}
  }
  
  .not-found__row {
	display: flex;
	align-items: center;
	justify-content: space-between;
  }
  .not-found__row span {
	max-width: 60%;
  }
  .not-found__row div {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
  }
  .not-found__row div span {
	font-weight: 600;
	font-size: 11px;
	text-align: right;
	color: #777777;
  }
  @media screen and (max-width: 768px) {
	.not-found__row div span {
	  font-size: 8px;
	  max-width: 100%;
	}
  }
  @media screen and (max-width: 1006px) {
	.not-found__row img {
	  height: 39px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__row img {
	  height: 30px;
	}
  }
  .not-found__row a {
	font-size: 24px;
	font-weight: 700;
	text-decoration: none;
	color: #0093d0;
  }
  @media screen and (max-width: 768px) {
	.not-found__row a {
	  font-size: 12px;
	}
  }
  .not-found__row a.tg {
	background: url("https://cdn.coral.ru/content/insider/russia/404/telegram.png") no-repeat;
	background-size: contain;
  }
  .not-found__row a.wa {
	background: url("https://cdn.coral.ru/content/insider/russia/404/whatsapp.png") no-repeat;
	background-size: contain;
  }
  .not-found__row a.vk {
	background: url("https://cdn.coral.ru/content/insider/russia/404/vk.png") no-repeat;
	background-size: contain;
  }
  .not-found__row a.msg {
	background: url("https://cdn.coral.ru/content/insider/russia/404/line.png") no-repeat;
	background-size: contain;
  }
  
  .not-found__mini-card {
	background: #67c892;
	border-radius: 8px;
	color: #fff;
	padding: 8px 11px;
  }
  @media screen and (max-width: 1006px) {
	.not-found__mini-card {
	  padding: 4px 6px;
	  border-radius: 4px;
	}
  }
  
  .not-found__social {
	flex-direction: row !important;
	-moz-column-gap: 16px;
		 column-gap: 16px;
	transition: 0.3s;
  }
  .not-found__social a {
	width: 40px;
	height: 40px;
	background-size: contain;
  }
  @media screen and (max-width: 1006px) {
	.not-found__social a {
	  width: 54px;
	  height: 54px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__social a {
	  width: 27px;
	  height: 27px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__social {
	  -moz-column-gap: 8px;
		   column-gap: 8px;
	}
  }
  .not-found__social:hover {
	transition: 0.3s;
	opacity: 0.7;
  }
  
  .not-found__button {
	background: #f0ab12;
	padding: 12px 32px;
	text-decoration: none;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	width: -webkit-fit-content;
	width: -moz-fit-content;
	width: fit-content;
	border-radius: 8px;
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 1.2;
	transition: 0.3s;
  }
  .not-found__button:hover {
	color: #fff;
	transition: 0.3s;
	opacity: 0.7;
  }
  @media screen and (max-width: 1006px) {
	.not-found__button {
	  font-size: 24px;
	  padding: 15px 32px;
	}
  }
  @media screen and (max-width: 768px) {
	.not-found__button {
	  font-size: 12px;
	  padding: 7px 16px;
	}
  }</style>`;

const head = document.querySelector("head");
const notFound = document.querySelector(".notAvailable");
let initialContent = notFound.children;
for (let i = 0; initialContent[i] !== undefined; i) {
	initialContent[i].remove();
}
notFound.classList.remove("notAvailable");
notFound.classList.add("not-found");
notFound.insertAdjacentHTML("afterbegin", layout);
head.insertAdjacentHTML("beforeend", styles);
