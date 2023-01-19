const currentPageCity = document.querySelector(".geolocation-current").dataset.itemname;

const coralTabs = {
	first: "Египет",
    first2: "Таиланд",
	second: "ОАЭ",
	third: "Индия",
	fourth: "Мальдивы",
	fifth: "Россия",
    five: "Турция",
	moreBtn: {
		text: "",
		exist: true,
	},
	tabsCount: 7,
	hideTab: "Бахрейн",
};

const sunmarTabs = {
	first: "Египет",
    first2: "Таиланд",
	second: "ОАЭ",
	third: "Индия",
	fourth: "Мальдивы",
	fifth: "Россия",
    five: "Турция",
	moreBtn: {
		text: "",
		exist: true,
	},
	tabsCount: 7,
	hideTab: "Бахрейн",
};

if (currentPageCity !== "Москва" && currentPageCity !== "Санкт-Петербург") {
	coralTabs.moreBtn.text = "Еще страны";
	sunmarTabs.moreBtn.text = "Еще страны";
} else {
	coralTabs.moreBtn.text = "СНГ";
	sunmarTabs.moreBtn.text = "СНГ";
}

const bestDealsContainer = document.querySelector(".bestdealsboxwrapper");
const desktopCarousel = bestDealsContainer.querySelector(".carouselcontainer");
const mobileCarousel = bestDealsContainer.querySelector(".carouselcontainer_mobile");

const bestDealsHeader = bestDealsContainer.querySelector(".bestdeals-header");
const bestDealsBody = bestDealsContainer.querySelector(".bestdeals-body");
const bestDealsNavigation = bestDealsContainer.querySelector(".owl-navigation");
const bestDealsTitle = bestDealsHeader.querySelector("h2");
const bestDealsTabs = bestDealsHeader.querySelectorAll(".nav-item");

const flameLeft = `<div class="flame_left"><svg width="35" height="67" viewBox="0 0 35 67" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_278_1046)">
<path d="M26.8839 29.1686C26.0723 28.9691 26.2177 31.1217 26.6235 32.7176C26.9881 34.1582 27.8227 32.8203 28.7628 33.7974C29.7028 34.7746 31.2667 35.1353 31.3708 34.7232C31.475 34.3111 30.1716 31.8933 30.1716 31.2769C30.1716 30.6606 29.389 29.7849 26.8851 29.1674L26.8839 29.1686Z" fill="url(#paint0_linear_278_1046)"/>
<path d="M18.9022 6.94512C20.2904 6.68829 20.311 5.70996 20.2589 4.57872C20.2068 3.44748 20.9894 3.90977 19.9985 2.21231C19.0076 0.514852 19.0124 0.41212 18.4625 0C18.4625 0 18.7992 0.925777 18.0688 2.16094C17.3383 3.39611 16.9216 3.96113 17.4946 4.73281C18.0688 5.50449 18.5436 5.60722 18.4625 6.17344C18.3813 6.73966 18.4322 7.03232 18.9034 6.94512H18.9022Z" fill="url(#paint1_linear_278_1046)"/>
<path d="M0.669819 28.6537C0.203443 27.8796 3.17371 30.5447 3.01745 31.8945C2.86118 33.2444 2.89994 34.7495 1.92237 35.0971C0.944799 35.4447 -0.0739597 34.5572 0.00477914 33.8237C0.0835179 33.0903 0.083518 32.898 0.513553 32.2804C0.943588 31.6628 1.5311 30.0812 0.669819 28.6537Z" fill="url(#paint2_linear_278_1046)"/>
<path d="M31.0303 39.3031C29.8565 37.8374 25.7354 38.891 25.2133 36.2164C25.2133 36.2164 24.1715 37.3476 25.475 38.7895C26.7784 40.2289 28.7348 40.3842 29.7789 42.2357C30.8231 44.0873 30.9794 44.8327 29.7789 45.8624C28.5785 46.8921 26.5313 47.8179 26.845 46.1706C27.1588 44.5233 27.1975 42.4281 26.18 41.734C26.18 41.734 25.9062 43.1233 24.5362 43.6632C23.5344 44.0586 22.776 45.3583 22.776 46.3259C22.776 50.6466 28.0842 49.1809 28.9189 50.9822C29.2956 51.7945 29.0436 52.6295 28.2914 53.1886C27.3768 53.8707 25.7197 54.1514 23.5465 53.5016C19.5805 52.3178 19.79 49.4377 19.9984 46.5063C20.2067 43.5736 18.1208 42.4938 16.764 41.9777C16.764 41.9777 18.6416 45.2185 17.3903 45.9388C16.1378 46.6592 9.35653 45.0632 11.4437 41.6182C13.5309 38.1719 18.3303 37.1422 20.9384 35.9584C23.5477 34.7758 24.2248 32.1525 21.3563 27.1617C21.3563 27.1617 21.1468 28.2416 19.165 26.9061C17.182 25.5682 16.5557 24.1789 16.6611 22.1732C16.764 20.1664 19.2679 18.3662 18.2262 16.5135C17.182 14.6619 14.9397 13.8389 14.9397 12.2955C14.9397 10.7521 18.7991 11.0102 19.165 12.759C19.165 12.759 19.5029 11.8069 17.4957 9.82637C15.5393 7.89717 13.2971 8.92687 10.8707 11.3184C8.44437 13.7099 9.87863 16.7201 8.93982 16.9758C8.00101 17.2338 7.531 16.6676 7.531 16.6676C7.531 16.6676 7.21846 19.4449 9.25235 21.1961C10.2675 22.0693 11.05 22.6869 11.577 23.4108H11.5782C12.1075 24.1395 12.3825 24.9757 12.3825 26.2885C12.3825 28.9117 12.7484 31.4836 11.5479 32.8215C10.3474 34.1594 8.73025 34.3648 7.84353 36.1137C6.95802 37.8637 4.24456 37.1434 6.85263 33.543C6.85263 33.543 3.09619 33.8512 3.04531 36.6811C2.99201 39.5098 4.19247 39.9733 3.40993 41.0531C2.62739 42.133 1.92358 42.5451 1.92358 44.6284C1.92358 48.2228 5.44502 48.101 5.75756 52.4993C6.07009 56.8977 5.28755 57.0518 3.83997 57.2835C3.83997 57.2835 3.25366 62.6076 7.79144 64.0745C8.11488 64.1796 8.42862 64.2824 8.73025 64.3827C11.4704 65.2965 13.3189 66.036 14.8525 66.4971C14.8561 66.4983 14.8598 66.4983 14.8634 66.5007C15.5224 66.6978 16.1232 66.8435 16.7119 66.9295C18.8246 67.2377 24.5374 66.466 27.0413 66.3896C29.5452 66.3119 32.5966 64.7686 33.6929 62.4547C34.3846 60.995 34.7007 59.5627 34.645 58.1818V58.1782C34.6123 57.3707 34.4512 56.5823 34.1629 55.8154C33.3803 53.7345 33.1066 50.4172 34.6511 46.3271C36.1968 42.2369 32.2065 40.7712 31.0327 39.3055L31.0303 39.3031ZM7.73814 51.4947C7.73814 51.4947 7.84111 50.3109 7.42561 48.9216C7.00769 47.5324 5.91261 46.6592 5.80722 46.0416C5.70426 45.424 6.25906 42.4926 6.27723 42.6467C6.38262 43.5199 7.00769 43.3144 8.05189 46.0416C9.09366 48.7675 7.73935 51.4935 7.73935 51.4935L7.73814 51.4947Z" fill="url(#paint3_linear_278_1046)"/>
<path d="M31.8528 61.7965C31.6178 62.6841 30.679 64.1892 23.1273 64.1116C15.5756 64.0339 17.8457 63.1476 16.5157 63.4558C15.1856 63.764 15.6944 64.4974 16.3982 65.0374C17.1008 65.5761 17.1383 67.0215 14.8634 66.4983C14.8597 66.4971 14.8561 66.4971 14.8525 66.4947C13.3189 66.0336 11.4703 65.2942 8.73022 64.3804C8.30018 62.4894 7.02704 60.7537 8.44676 58.5928C9.86527 56.4318 11.8204 51.5712 11.7041 50.0278C11.5866 48.4845 9.74777 47.2111 9.04396 45.5518C8.34016 43.8926 7.08761 42.1951 8.10515 39.3402C9.1227 36.4852 8.14392 37.0251 10.6478 35.5976C13.1517 34.1702 13.973 33.862 13.8955 32.3568C13.818 30.8517 13.7005 29.7718 13.3867 27.225C13.0742 24.6782 12.4746 22.9306 13.165 22.067C13.165 22.067 13.4267 22.7371 14.2092 25.4117C14.9918 28.0863 16.036 28.1902 17.3915 29.6297C18.7482 31.0715 18.0178 33.1285 15.2789 34.6719C12.54 36.2152 13.3225 37.5531 12.3837 38.5804C11.4449 39.6101 9.38072 39.6257 9.09726 41.4103C8.78352 43.3909 9.20144 44.3895 10.5315 45.5256C11.8798 46.6771 13.5769 48.2515 13.7101 50.4638C13.8446 52.6773 12.8513 53.6772 13.7101 54.1168C15.3685 54.9661 18.9239 51.0301 17.1444 47.5969C17.1444 47.5969 21.4726 48.9551 17.6144 54.4262C15.6653 57.1892 15.6556 58.7982 16.2976 60.0847C17.0281 61.5505 18.9832 62.4177 20.598 61.7488C22.7215 60.8696 23.1188 58.8508 24.8789 59.3131C26.6391 59.7766 26.7057 60.8337 27.9049 60.9592C28.8922 61.0619 28.9612 59.982 28.7662 58.9009C28.5712 57.8211 28.3192 57.1318 28.6354 56.3291C29 55.4033 30.2005 54.8371 30.8788 54.812C31.2289 54.7989 28.8922 56.8953 30.3701 58.8245C31.3392 60.0895 32.0914 60.9078 31.8564 61.7953L31.8528 61.7965Z" fill="url(#paint4_linear_278_1046)"/>
<path d="M20.936 35.9584C20.936 35.9584 22.6053 32.7176 21.2486 30.4551C19.8918 28.1914 17.1796 27.9859 15.4062 25.0008C13.6315 22.018 13.2148 19.5488 12.4843 20.2691C11.7539 20.9883 11.5746 23.4096 11.5746 23.4096H11.5734C11.0477 22.6857 10.2651 22.0681 9.24879 21.1949C7.21369 19.4449 7.52744 16.6664 7.52744 16.6664C7.52744 16.6664 7.99744 17.2326 8.93625 16.9746C9.87506 16.7189 8.44202 13.7087 10.8672 11.3172C13.2923 8.92568 15.5358 7.89598 17.4921 9.82518C19.5006 11.8057 19.1614 12.7578 19.1614 12.7578C18.7956 11.009 14.9362 10.751 14.9362 12.2943C14.9362 13.8377 17.1784 14.6607 18.2226 16.5123C19.2644 18.3638 16.7605 20.1652 16.6575 22.1721C16.5521 24.1789 17.1784 25.567 19.1614 26.9049C21.1432 28.2416 21.3528 27.1605 21.3528 27.1605C24.2213 32.1513 23.5441 34.7746 20.9348 35.9572L20.936 35.9584Z" fill="url(#paint5_linear_278_1046)"/>
<path d="M34.6487 46.3247C33.1042 50.4148 33.378 53.7321 34.1605 55.813C34.4488 56.5799 34.61 57.3683 34.6427 58.1758C34.3677 56.8344 33.143 55.8142 32.3096 54.6328C31.4737 53.4502 31.1612 52.0096 31.3756 49.8486C31.5912 47.6877 30.3266 48.5633 30.0068 47.6375C29.6845 46.7117 29.5973 48.5131 29.9632 50.8783C30.3217 53.2053 28.3581 53.1898 28.2915 53.1886C29.0437 52.6283 29.2957 51.7934 28.919 50.9823C28.0843 49.1809 22.7761 50.6478 22.7761 46.3259C22.7761 45.3583 23.5356 44.0586 24.5362 43.6632C25.9051 43.1233 26.1801 41.734 26.1801 41.734C27.1976 42.4281 27.1576 44.5245 26.8451 46.1706C26.5326 47.8167 28.5786 46.8909 29.779 45.8624C30.9795 44.8327 30.8232 44.0873 29.779 42.2357C28.7348 40.3842 26.7785 40.2289 25.475 38.7895C24.1716 37.3476 25.2134 36.2164 25.2134 36.2164C25.7355 38.891 29.8566 37.8374 31.0304 39.3031C32.2042 40.7688 36.1944 42.2357 34.6487 46.3247Z" fill="url(#paint6_linear_278_1046)"/>
</g>
<defs>
<linearGradient id="paint0_linear_278_1046" x1="28.8354" y1="29.6309" x2="28.8354" y2="36.0098" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint1_linear_278_1046" x1="18.8634" y1="0.617583" x2="18.8634" y2="14.3155" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint2_linear_278_1046" x1="1.51172" y1="31.1742" x2="1.51172" y2="38.1779" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint3_linear_278_1046" x1="18.4612" y1="68.2137" x2="18.4612" y2="11.273" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE40C"/>
<stop offset="0.49" stop-color="#F89A00"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint4_linear_278_1046" x1="19.8082" y1="67.1852" x2="19.8082" y2="31.1647" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEAB5"/>
<stop offset="0.52" stop-color="#FFE40C"/>
<stop offset="1" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint5_linear_278_1046" x1="15.3662" y1="8.43711" x2="15.3662" y2="39.1108" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint6_linear_278_1046" x1="28.8875" y1="38.3761" x2="28.8875" y2="57.1091" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<clipPath id="clip0_278_1046">
<rect width="35" height="67" fill="white"/>
</clipPath>
</defs>
</svg>
</div>`;
const flameRight = `<div class="flame_right"><svg width="29" height="47" viewBox="0 0 29 47" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.038 41.8389C29.4093 40.0345 29.1641 37.3102 28.2405 37.1303C26.4249 36.7769 26.7215 35.1502 25.2232 34.8447C25.2232 34.8447 25.2955 37.9681 23.029 40.3379C21.9259 41.4919 22.8813 43.2612 22.3286 44.4972C22.322 44.5121 22.3144 44.527 22.3067 44.5419C22.2312 44.1256 21.9511 43.6338 21.4279 43.0504C20.3927 41.8953 20.7385 40.8702 21.4367 39.7843C22.4096 38.2694 24.0676 36.6363 23.6101 34.3741C22.8233 30.4895 18.3385 28.4487 17.0066 29.0374C15.6759 29.6261 13.8045 32.3983 13.8647 30.8088C13.9084 29.6697 14.8223 29.3163 15.6266 27.9728C15.944 27.4416 16.2439 26.756 16.4671 25.8064C17.254 22.4519 12.837 19.5084 12.837 19.5084C13.0898 20.8359 9.99384 22.9746 9.0483 25.1932C8.86225 25.6318 8.75938 26.0725 8.78236 26.5122C9.20589 34.34 5.87788 33.2457 5.87788 33.2457C3.76025 35.0459 7.26993 38.3418 6.42288 40.2846C6.26638 40.6423 6.28718 41.115 6.46337 41.643C2.99418 39.1168 4.42673 40.2261 3.33782 39.1668C2.24891 38.1076 1.61089 36.6001 3.76134 35.0469C5.42809 33.8429 1.92826 30.9057 1.92826 30.9057C2.35178 33.0828 0.191474 32.0459 0.00980697 35.1651C-0.17186 38.2843 2.36929 39.4032 1.82538 42.5809C1.61089 43.835 2.5039 44.8975 3.99773 45.665C5.07789 46.2207 6.47213 46.6221 7.98894 46.8318C8.51205 46.9052 9.04939 46.9542 9.59221 46.9798C10.8146 47.0373 12.071 46.9723 13.2715 46.7658C14.2586 46.9681 15.329 47.0404 16.466 46.9361C17.046 46.8829 17.6009 46.8243 18.1207 46.7573C18.1207 46.7573 23.1811 47.1512 24.1497 45.994C25.1182 44.8368 26.6667 43.6444 28.038 41.8389Z" fill="url(#paint0_linear_278_1054)"/>
<path d="M11.6157 15.6557C11.6157 15.6557 11.5216 13.9406 10.2969 9.70042C9.07233 5.46021 15.1954 5.03119 15.1954 5.03119C15.1954 5.03119 13.4816 7.36581 16.7625 8.98609C20.0446 10.6064 20.8282 10.7969 19.6036 14.4176C18.3789 18.0382 15.1429 19.5105 15.1429 19.5105C15.1429 19.5105 16.3215 12.3683 14.2652 13.3221C12.2077 14.2749 13.3765 14.656 11.6168 15.6567L11.6157 15.6557Z" fill="url(#paint1_linear_278_1054)"/>
<path d="M1.09888 28.5094C1.29915 29.74 1.15907 30.334 2.61131 29.6846C4.55603 28.8159 5.03099 31.4689 5.33413 30.4959C5.63618 29.5228 5.46765 28.0026 4.72894 27.0903C2.00612 23.7251 5.89993 25.2187 5.15247 26.2386C4.85808 26.641 6.68022 25.7202 6.12099 24.7748C4.9708 22.833 0.000120997 21.7791 1.09888 28.5094Z" fill="url(#paint2_linear_278_1054)"/>
<path d="M13.6862 0.393898C11.8674 1.72036 14.6547 1.88537 15.0575 0.786726C15.4602 -0.311917 14.3319 -0.0766454 13.6862 0.393898Z" fill="url(#paint3_linear_278_1054)"/>
<path d="M4.34365 19.5105C3.69578 19.4583 3.93983 21.1585 4.74748 21.3938C5.55404 21.629 5.31218 19.5893 4.34365 19.5105Z" fill="url(#paint4_linear_278_1054)"/>
<path d="M21.5113 23.3089C21.1994 24.5885 21.5113 24.2511 21.9151 25.7415C22.3189 27.2329 23.6902 23.3877 22.6407 22.0932C21.5922 20.7976 21.671 22.6563 21.5113 23.3089Z" fill="url(#paint5_linear_278_1054)"/>
<path d="M16.4662 46.9361C15.3291 47.0404 14.2588 46.9681 13.2717 46.7658C12.0711 46.9723 10.8148 47.0373 9.59236 46.9798C9.12835 44.9549 9.9557 43.2271 10.4602 41.1235C11.0249 38.7698 9.58142 36.6502 9.45557 35.0022C9.45557 35.0022 11.3368 36.8067 13.0769 38.0629C14.8169 39.318 18.7698 36.8077 17.3986 35.4728C16.0273 34.1388 17.682 31.784 17.682 31.784C17.682 31.784 17.6404 33.9025 19.2536 34.9234C20.8667 35.9433 22.3868 36.5714 21.3854 38.8475C21.2552 39.1434 21.2858 39.4564 21.4368 39.7854C20.7386 40.8712 20.3917 41.8975 21.4281 43.0515C23.9091 45.8172 20.9444 46.5241 16.4673 46.9361H16.4662Z" fill="url(#paint6_linear_278_1054)"/>
<path d="M7.988 46.8318C6.47119 46.6221 5.07695 46.2197 3.9968 45.665C3.74947 43.9287 3.33141 41.7101 2.79517 40.8095C2.79517 40.8095 4.84604 41.2023 5.23235 42.7715C5.61867 44.3407 7.0742 43.8425 7.7155 45.3616C7.87638 45.7427 7.95736 46.2644 7.98691 46.8318H7.988Z" fill="url(#paint7_linear_278_1054)"/>
<path d="M16.4661 25.8075C16.2439 26.7571 15.9429 27.4427 15.6256 27.9728C16.1126 24.6322 14.251 24.6428 14.1099 25.8181C13.9687 26.9934 12.477 26.6048 11.8445 26.9189C10.9329 27.3713 9.8538 26.0108 9.04834 25.1943C9.99279 22.9757 13.0888 20.837 12.8371 19.5094C12.8371 19.5094 17.254 22.4519 16.4671 25.8075H16.4661Z" fill="url(#paint8_linear_278_1054)"/>
<defs>
<linearGradient id="paint0_linear_278_1054" x1="14.4994" y1="47.1724" x2="14.4994" y2="21.5364" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE40C"/>
<stop offset="0.49" stop-color="#F89A00"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint1_linear_278_1054" x1="15.1429" y1="2.51453" x2="15.1429" y2="43.4944" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint2_linear_278_1054" x1="3.58422" y1="18.5577" x2="3.58422" y2="34.85" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint3_linear_278_1054" x1="14.2093" y1="-0.123487" x2="13.4456" y2="7.15314" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint4_linear_278_1054" x1="4.59536" y1="20.5272" x2="3.98408" y2="27.2265" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint5_linear_278_1054" x1="22.2062" y1="30.9579" x2="22.2062" y2="16.5659" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFE40C"/>
<stop offset="0.49" stop-color="#F89A00"/>
<stop offset="1" stop-color="#FC790F"/>
</linearGradient>
<linearGradient id="paint6_linear_278_1054" x1="15.8916" y1="48.6927" x2="15.8916" y2="35.0341" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEAB5"/>
<stop offset="0.52" stop-color="#FFE40C"/>
<stop offset="1" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint7_linear_278_1054" x1="5.39213" y1="46.6529" x2="5.39213" y2="38.988" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFEAB5"/>
<stop offset="0.52" stop-color="#FFE40C"/>
<stop offset="1" stop-color="#F89A00"/>
</linearGradient>
<linearGradient id="paint8_linear_278_1054" x1="12.8032" y1="14.4431" x2="12.8032" y2="38.7261" gradientUnits="userSpaceOnUse">
<stop stop-color="#8B1511"/>
<stop offset="0.49" stop-color="#FC790F"/>
<stop offset="0.99" stop-color="#F89A00"/>
</linearGradient>
</defs>
</svg>
</div>`;
const star = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2282 4.10974L14.0377 4.68931C14.1932 4.7128 14.3393 4.78048 14.4596 4.88477C14.58 4.98907 14.6698 5.12586 14.719 5.27981C14.7681 5.43461 14.7745 5.60044 14.7376 5.75879C14.7006 5.91713 14.6216 6.06176 14.5095 6.1765L11.7472 8.97046L12.3994 12.9782C12.426 13.1396 12.408 13.3054 12.3475 13.4567C12.287 13.608 12.1865 13.7387 12.0574 13.8339C11.9289 13.9291 11.7772 13.9854 11.6194 13.9965C11.4615 14.0076 11.3038 13.9731 11.164 13.8968L7.76016 12.0255L4.35897 13.8982C4.21869 13.9745 4.06056 14.0091 3.9023 13.998C3.74404 13.9869 3.59191 13.9305 3.46295 13.8353C3.33417 13.7399 3.23404 13.6091 3.17403 13.4577C3.11401 13.3064 3.09655 13.1407 3.12362 12.9796L3.77576 8.97183L1.01266 6.1765C0.900663 6.0617 0.821801 5.91706 0.784868 5.75872C0.747935 5.60039 0.754384 5.43459 0.803496 5.27981C0.852428 5.12555 0.942245 4.98849 1.06279 4.88413C1.18333 4.77978 1.32979 4.71229 1.48559 4.68931L5.29185 4.10974L6.99907 0.492089C7.0682 0.344601 7.17626 0.220199 7.31083 0.133159C7.4454 0.04612 7.60105 -3.03018e-05 7.7599 2.83352e-06C7.91917 -0.000415725 8.07533 0.0455448 8.21039 0.132599C8.34546 0.219653 8.45395 0.344263 8.52338 0.492089L10.2282 4.10974Z" fill="#FBB200"/>
</svg>`;
const oldPriceLayout = `<div class="old-price-container"><p class="old-price">#####</p></div>`;
const newPriceLayout = `<div class="new-price-container"><p class="new-price">#####</p></div>`;
const countryPlate = `<div class="image-plate"><p class="plate-text"></p></div>`;
const cardButtonLayout = `<a class="card-button-link" href="#">Купить тур</a>`;

const observerConfig = {
	childList: true,
};

function callback(mutationsList, observer) {
	for (let mutation of mutationsList) {
		if (mutation.type === "childList") {
			if (!document.querySelector(".canvasloader")) {
				setNewStyles();
			}
		}
	}
}

const observer = new MutationObserver(callback);

function navigationFix(nav) {
	if (nav.querySelector(".alldeals")) {
		nav.classList.remove("d-flex");
		nav.classList.remove("flex-nowrap");
		const moreButtonWrapper = nav.lastElementChild;
		moreButtonWrapper.classList.add("more-button-wrapper");
		moreButtonWrapper.classList.remove("pr-0");
		moreButtonWrapper.classList.remove("text-right");
	}
}

function setNewStyles() {
	const bestDealsNavigation = bestDealsContainer.querySelector(".owl-navigation");
	const allCardPages = bestDealsContainer.querySelectorAll(".owl-item");
	bestDealsContainer.classList.add("best-deals__styling");

	let topRow, bottomRow, currentSceneCards;

	allCardPages.forEach((page) => {
		const scene = page.querySelector(".scene");
		if (window.innerWidth > 1006) {
			topRow = scene.firstElementChild;
			bottomRow = scene.lastElementChild;
			currentSceneCards = scene.querySelectorAll(".col-sm-6");
		} else {
			topRow = scene.firstElementChild;
			currentSceneCards = [scene];
		}

		scene.classList.add("best-deals__scene_custom");
		topRow.style.height = "auto";
		currentSceneCards.forEach((card) => {
			const item = card.querySelector(".item");
			const imageWrapper = item.querySelector(".imagewrapper");
			const img = imageWrapper.querySelector("img");
			const content = item.querySelector(".content");
			const textContent = content.querySelector(".left-content");
			const stars = textContent.querySelectorAll(".material-icons");
			const cardTitle = textContent.querySelector("h3");
			const cardCountry = textContent.querySelector("p");
			const cardTourists = textContent.querySelector("em");
			const flightPriceContent = content.querySelector(".right-content");
			const flight = flightPriceContent.querySelector(".flight");
			const priceContainer = flightPriceContent.querySelector(".price");
			if (priceContainer === null) {
				return;
			}
			const priceStroke = priceContainer.lastElementChild;
			const fullPrice = priceStroke.textContent;
			const price = fullPrice.split(" ");
			const arrPrice = price.filter((i) => {
				return i !== "";
			});
			const currencyFont = priceContainer.querySelector(".currencyfont").textContent;
			const oldPriceText = `от ${Math.round((`${arrPrice[0]}${arrPrice[1]}` * 110) / 100).toLocaleString("ru")} ${currencyFont}`;
			const newPriceText = `${arrPrice[0]} ${arrPrice[1]} ${currencyFont}`;
			const cardLink = item.parentElement.getAttribute("href");

			stars.forEach((item) => {
				item.textContent = "";
				item.insertAdjacentHTML("beforeend", star);
			});

			priceContainer.remove();
			flightPriceContent.classList.add("best-deals__card-flights-price");
			flightPriceContent.insertAdjacentHTML("beforeend", oldPriceLayout);
			flightPriceContent.insertAdjacentHTML("beforeend", newPriceLayout);
			flightPriceContent.insertAdjacentHTML("beforeend", cardButtonLayout);
			const buttonLink = flightPriceContent.querySelector(".card-button-link");
			const oldPrice = flightPriceContent.querySelector(".old-price");
			const newPrice = flightPriceContent.querySelector(".new-price");
			oldPrice.textContent = oldPriceText;
			newPrice.textContent = newPriceText;

			buttonLink.href = `${location.origin}${cardLink}`;

			if (flight) {
				flight.querySelector(".material-icons").remove();
				flight.classList.add("best-deals__card-flights");
			}
			const cardTouristsInfo = cardTourists.textContent.split(" ");
			cardTourists.textContent = `${cardTouristsInfo[3]} ${cardTouristsInfo[4]} на двоих`;
			cardTourists.classList.add("best-deals__card-tourists");

			let countryRu;
			const countryInfo = cardCountry.textContent.split(",");
			const currentCountry = countryInfo[1].split(" ");
			if (currentCountry.length > 2) {
				if (currentCountry[2].split("")[0] >= "a" && "z" <= currentCountry[2].split("")[0]) {
					countryRu = countryInfo[1];
				} else {
					countryRu = currentCountry[1];
				}
			} else {
				if (currentCountry[1].split("")[0] >= "a" && "z" <= currentCountry[1].split("")[0]) {
					countryRu = countryInfo[1];
				} else {
					countryRu = currentCountry[1];
				}
			}

			cardCountry.remove();
			cardTitle.classList.add("best-deals__card-title");
			textContent.classList.add("best-deals__card-text-content");
			content.classList.add("best-deals__card-content");
			img.classList.add("best-deals__card-image");
			imageWrapper.classList.add("best-deals__card-image-wrapper");
			imageWrapper.insertAdjacentHTML("afterbegin", countryPlate);
			imageWrapper.querySelector(".plate-text").textContent = countryRu;

			if (countryRu.length > 17) {
				imageWrapper.querySelector(".image-plate").classList.add("image-plate_big");
			}

			item.classList.add("best-deals__card");

			card.classList.add("best-deals__card-wrapper");
			if (window.innerWidth > 1006) {
				topRow.insertAdjacentElement("beforeEnd", card);
			}

			setMetricGoals(null, null, card);
		});

		if (window.innerWidth > 1006) {
			if (topRow !== bottomRow) {
				bottomRow.remove();
			}
		}
	});
	navigationFix(bestDealsNavigation);
	bestDealsContainer.classList.remove("best-deals__styling");
}

const setNewTitle = () => {
	const titleWrapper = bestDealsHeader.querySelector(".flex-grow-1");
	titleWrapper.classList.add("best-deals__title-wrapper");
	bestDealsTitle.classList.add("best-deals__title");
	bestDealsTitle.textContent = "Горящие предложения";
	titleWrapper.insertAdjacentHTML("afterbegin", flameLeft);
	titleWrapper.insertAdjacentHTML("beforeend", flameRight);
};

const setHeaderStyles = () => {
	const tabsContainer = bestDealsHeader.querySelector(".align-items-end");
	const tabsList = tabsContainer.querySelector(".nav-tabs");
	let tabs = tabsContainer.querySelectorAll(".nav-item");
	let allDropdownCountries;
	const dropDownButton = tabsContainer.querySelector(".dropdown-toggle");
	const dropdownTab = tabsContainer.querySelector(".dropdown");
	tabsList.classList.contains("pull-right") ? tabsList.classList.remove("pull-right") : tabsList;

	bestDealsHeader.classList.add("best-deals__header");
	tabsContainer.classList.add("best-deals__tabs-container");



	tabs.forEach((tab) => {
		if (tab.firstElementChild.textContent === "Все") {
			tab.remove();
		}

		if (tab.firstElementChild.classList.contains("active")) {
			tab.firstElementChild.classList.remove("active");
		}

		tab.firstElementChild.classList.add("best-deals__tab-link");
		tab.classList.add("best-deals__tab");
	});

	tabs = tabsContainer.querySelectorAll(".nav-item");

	if (tabs.length === 1) {
		tabs.forEach((tab) => {
			tab.classList.add("best-deals__tab_single");
			tab.querySelector(".best-deals__tab-link").classList.add("best-deals__tab-link_single");
		});
	}

	if (dropdownTab) {
		const dropdownMenu = tabsContainer.querySelector(".destinationdropdown");
		allDropdownCountries = dropdownMenu.querySelectorAll("li");
		const dropdownCountries = dropdownMenu.querySelectorAll(".nav-link");



		dropdownMenu.classList.add("best-deals__dropdown-menu");

		if (currentPageCity === "Москва" || currentPageCity === "Санкт-Петербург") {
			tabs.forEach((tab) => {
				if (!tab.classList.contains("dropdown")) {
					tab.remove();
				}
			});
			tabs = tabsContainer.querySelectorAll(".nav-item");
			changeTabsOrder(dropdownCountries, tabs, tabsList, tabsContainer, dropdownTab, dropdownMenu, allDropdownCountries, dropDownButton);
		}

		tabs = tabsContainer.querySelectorAll(".nav-item");

		/* Прячем страны в выпадающем списке, которые уже отражены в табах */

		hideDropdownCounties(allDropdownCountries, tabs, dropdownTab, dropdownMenu);

		setTurkeyFirst(tabs, tabsList, tabsContainer);
		tabs = tabsContainer.querySelectorAll(".nav-item");
	} else {
		setTurkeyFirst(tabs, tabsList, tabsContainer);
		tabs = tabsContainer.querySelectorAll(".nav-item");
	}

	setMetricGoals(tabs, allDropdownCountries, null);
};

const setMetricGoals = (tabs, allDropdownCountries, card) => {
	/* ЦЕЛИ КЛИКОВ ПО СТРАНАМ В ВЫПАДАЮЩЕМ МЕНЮ */
	if (allDropdownCountries) {
		allDropdownCountries.forEach((country) => {
			country.firstElementChild.addEventListener("click", () => {
				if (location.origin === "https://www.coral.ru") {
					ym(553380, "reachGoal", "hotoffers", { hotoffers_down_product_name: `${country.firstElementChild.getAttribute("data-name")}` });
				}
				if (location.origin === "https://www.sunmar.ru") {
					ym(215233, "reachGoal", "hotoffers", { hotoffers_down_product_name: `${country.firstElementChild.getAttribute("data-name")}` });
				}
			});
		});
	}
	/* ЦЕЛИ КЛИКИ ПО ТАБАМ */
	if (tabs) {
		tabs.forEach((tab) => {
			if (tab.firstElementChild.textContent !== `${coralTabs.moreBtn.text}` && tab.firstElementChild.textContent !== `${sunmarTabs.moreBtn.text}`) {
				tab.addEventListener("click", () => {
					if (location.origin === "https://www.coral.ru") {
						ym(553380, "reachGoal", "hotoffers", { hotoffers_down_product_name: `${tab.firstElementChild.textContent}` });
					}
					if (location.origin === "https://www.sunmar.ru") {
						ym(215233, "reachGoal", "hotoffers", { hotoffers_down_product_name: `${tab.firstElementChild.textContent}` });
					}
				});
			}
		});
	}
	/* ЦЕЛИ КЛИКОВ ПО КАРТОЧКАМ */
	if (card)
		card.addEventListener("click", () => {
			if (location.origin === "https://www.coral.ru") {
				ym(553380, "reachGoal", "hotoffers1", { hotoffers_down_hotel: `${cardTitle.textContent}` });
			}
			if (location.origin === "https://www.sunmar.ru") {
				ym(215233, "reachGoal", "hotoffers1", { hotoffers_down_hotel: `${cardTitle.textContent}` });
			}
		});
};

const hideDropdownCounties = (allDropdownCountries, tabs, dropdownTab, dropdownMenu) => {
	allDropdownCountries.forEach((country) => {
		country.classList.remove("d-inline-block");
		country.classList.remove("d-md-none");
		const countryDropdown = country.firstElementChild.getAttribute("data-name");
		tabs.forEach((tab) => {
			const countryTab = tab.firstElementChild.textContent;
			if (countryDropdown === countryTab || countryDropdown === "Все" || countryDropdown === coralTabs.hideTab) {
				country.classList.add("d-inline-block");
				country.classList.add("d-md-none");
			}
		});
		if (country.classList.contains("d-md-none")) {
			country.remove();
			allDropdownCountries = dropdownMenu.querySelectorAll("li");
			if (allDropdownCountries.length < 1) {
				dropdownTab.remove();
				dropdownMenu.remove();
			}
		}
	});
};

const changeTabsOrder = (dropdownCountries, tabs, tabsList, tabsContainer, dropdownTab, dropdownMenu, allDropdownCountries, dropDownButton) => {
	let countryTab, dataId, dataName, dataURL, dataViewType, dataisHomePage, dataOptionId;
	let firstTab, secondTab, thirdTab, fourthTab, fifthTab, fiveTab, moreTab;

	for (let i = 0; i < dropdownCountries.length; i++) {

		if (tabs[i] === undefined || tabs[i]) {
			dataId = dropdownCountries[i].getAttribute("data-id");
			dataName = dropdownCountries[i].getAttribute("data-name");
			dataURL = dropdownCountries[i].getAttribute("data-url");
			dataViewType = dropdownCountries[i].getAttribute("data-viewtype");
			dataisHomePage = dropdownCountries[i].getAttribute("data-ishome");
			dataOptionId = dropdownCountries[i].getAttribute("data-optionid");

			countryTab = `<li class="nav-item best-deals__tab"><a class="nav-link best-deals__tab-link" data-id=${dataId} data-name=${dataName} data-url=${dataURL} data-viewtype=${dataViewType} data-ishome=${dataisHomePage} data-optionid=${dataOptionId}>${dataName}</a></li>`;

			/* СТРАНЫ КОТОРЫЕ НУЖНЫ ВО ВКЛАДКАХ */

			if (dataName === coralTabs.first || dataName === coralTabs.second || dataName === coralTabs.third || dataName === coralTabs.fourth || dataName === coralTabs.fifth || dataName === coralTabs.five || dataName === coralTabs.first2) {
				tabsList.insertAdjacentHTML("beforeend", countryTab);
			} else {
				continue;
			}
			tabs = tabsContainer.querySelectorAll(".nav-item");
		}
	}



	if (window.innerWidth > 1006) {
		/* ПОРЯДОК ВЫВОДА СТРАН НА ВКЛАДКАХ CORAL (Только десктоп) */
		if (location.origin === "https://www.coral.ru") {
			if (dropDownButton || dropdownTab) {
				dropDownButton.firstElementChild.textContent = coralTabs.moreBtn.text;
			}

			for (let i = 0; i < tabs.length; i++) {
				if (tabs[i].firstElementChild.textContent === coralTabs.first) {
					firstTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === coralTabs.second) {
					secondTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === coralTabs.third) {
					thirdTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === coralTabs.fourth) {
					fourthTab = tabs[i];
				}
				if (coralTabs.fifth) {
					if (tabs[i].firstElementChild.textContent === coralTabs.fifth) {
						fifthTab = tabs[i];
					}
				}
				if (tabs[i].classList.contains("dropdown")) {
					moreTab = tabs[i];
				}

				tabs[i].remove();
			}
			firstTab !== undefined ? tabsList.insertAdjacentElement("beforeend", firstTab) : false;
			secondTab !== undefined ? tabsList.insertAdjacentElement("beforeend", secondTab) : false;
			thirdTab !== undefined ? tabsList.insertAdjacentElement("beforeend", thirdTab) : false;
			fourthTab !== undefined ? tabsList.insertAdjacentElement("beforeend", fourthTab) : false;
			fifthTab !== undefined ? tabsList.insertAdjacentElement("beforeend", fifthTab) : false;
			tabsList.insertAdjacentElement("beforeend", moreTab);

			tabs = tabsContainer.querySelectorAll(".nav-item");

			if (window.innerWidth > 1006) {
				// КОЛИЧЕСТВО ВКЛАДОК ПРИ КОТОРОМ УДАЛЯЕТСЯ ИЗ РАЗМЕТКИ ПОДМЕНЮ СО СТРАНАМИ И КНОПКА "ЕЩЕ" SUNMAR
				if (!coralTabs.moreBtn.exist) {
					dropdownTab.remove();
					dropdownMenu.remove();
				}
			}
		}
		/* ПОРЯДОК ВЫВОДА СТРАН НА ВКЛАДКАХ SUNMAR (Только десктоп) */
		if (location.origin === "https://www.sunmar.ru") {
			if (dropDownButton || dropdownTab) {
				dropDownButton.firstElementChild.textContent = sunmarTabs.moreBtn.text;
			}
			let firstTab, firstTab2, secondTab, thirdTab, fourthTab, fifthTab, fiveTab, moreTab;

			for (let i = 0; i < tabs.length; i++) {

				if (tabs[i].firstElementChild.textContent === sunmarTabs.first) {
					firstTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === sunmarTabs.second) {
					secondTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === sunmarTabs.third) {
					thirdTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === sunmarTabs.fourth) {
					fourthTab = tabs[i];
				}
				if (tabs[i].firstElementChild.textContent === sunmarTabs.fifth) {
					fifthTab = tabs[i];
				}
                if (tabs[i].firstElementChild.textContent === sunmarTabs.five) {
					fiveTab = tabs[i];
				}
                if (tabs[i].firstElementChild.textContent === sunmarTabs.first2) {
					firstTab2 = tabs[i];
				}

				if (tabs[i].classList.contains("dropdown")) {
					moreTab = tabs[i];
				}

				tabs[i].remove();
			}
			firstTab !== undefined ? tabsList.insertAdjacentElement("beforeend", firstTab) : false;
            firstTab2 !== undefined ? tabsList.insertAdjacentElement("beforeend", firstTab2) : false;
			secondTab !== undefined ? tabsList.insertAdjacentElement("beforeend", secondTab) : false;
			thirdTab !== undefined ? tabsList.insertAdjacentElement("beforeend", thirdTab) : false;
			fourthTab !== undefined ? tabsList.insertAdjacentElement("beforeend", fourthTab) : false;
			fifthTab !== undefined ? tabsList.insertAdjacentElement("beforeend", fifthTab) : false;
            fiveTab !== undefined ? tabsList.insertAdjacentElement("beforeend", fiveTab) : false;
			tabsList.insertAdjacentElement("beforeend", moreTab);

			tabs = tabsContainer.querySelectorAll(".nav-item");

			if (window.innerWidth > 1006) {
				// КОЛИЧЕСТВО ВКЛАДОК ПРИ КОТОРОМ УДАЛЯЕТСЯ ИЗ РАЗМЕТКИ ПОДМЕНЮ СО СТРАНАМИ И КНОПКА "ЕЩЕ" SUNMAR
				if (!sunmarTabs.moreBtn.exist) {
					dropdownTab.remove();
					dropdownMenu.remove();
				}
			}
		}
	}
};

const setTurkeyFirst = (tabs, tabsList, tabsContainer) => {
	tabs.forEach((tab) => {
		if (tab.firstElementChild.textContent === "Египет") {
			tabsList.insertAdjacentElement("afterbegin", tab);
		}
	});
	tabs.forEach((tab) => {
		tab.addEventListener("click", function () {
			changeTabs(tab);
		});
		if (tab.firstElementChild.textContent === "Египет" || tabs.length === 1) {
			tab.firstElementChild.click();
		}
	});
	if (!tabsContainer.querySelector(".best-deals__tab_active")) {
		tabs[0].firstElementChild.click();
	}
};

function changeTabs(tab) {
	const allTabs = bestDealsContainer.querySelectorAll(".nav-item");
	allTabs.forEach((item) => {
		item.classList.remove("best-deals__tab_active");
		item.firstElementChild.classList.remove("best-deals__tab-link_active");
		item.firstElementChild.classList.remove("active");
	});
	if (!tab.classList.contains("best-deals__tab_active")) {
		tab.classList.remove("best-deals__tab_active");
		tab.classList.add("best-deals__tab_active");
		tab.firstElementChild.classList.add("best-deals__tab-link_active");
	} else {
		tab.firstElementChild.classList.remove("active");
		tab.classList.remove("best-deals__tab_active");
		tab.firstElementChild.classList.remove("best-deals__tab-link_active");
	}
}

setNewTitle();
setNewStyles();
setHeaderStyles();

if (window.innerWidth < 1007) {
	desktopCarousel.remove();
} else {
	mobileCarousel.remove();
}

observer.observe(bestDealsBody, observerConfig);