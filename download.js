// ==UserScript==
// @name         小红书图片下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       william.sv@icloud.com
// @match        https://www.xiaohongshu.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none

// ==/UserScript==

(function() {
    'use strict';
    let script = document.createElement('script')
	script.setAttribute('type', 'text/javascript')
	script.src = "https://libs.cdnjs.net/FileSaver.js/2.0.5/FileSaver.min.js"
	document.documentElement.appendChild(script)

    let mainContentElement = document.querySelector('.main-content')
	let observerConfig = { childList: true }
	let observerCallback = (mutationsList, observer) => {
		setTimeout(() => {
			let downloadBtn = '<div id="download_btn" style="position: fixed;display: flex;z-index: 100;cursor: pointer;width: 40px;height: 40px;left: 100px;top: 32px;"><svg t="1700462893385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10058" width="40" height="40"><path d="M512 1007.2c273.4 0 495-221.6 495-495s-221.6-495-495-495-495 221.6-495 495 221.6 495 495 495zM190.3 190.5c41.8-41.8 90.5-74.6 144.6-97.5C391 69.2 450.6 57.2 512 57.2s121 12 177.1 35.7c54.2 22.9 102.8 55.7 144.6 97.5s74.6 90.5 97.5 144.6C955 391.2 967 450.8 967 512.2c0 61.5-12 121-35.7 177.1-22.9 54.2-55.7 102.8-97.5 144.6s-90.5 74.6-144.6 97.5C633 955.2 573.4 967.2 512 967.2s-121-12-177.1-35.7c-54.2-22.9-102.8-55.7-144.6-97.5s-74.6-90.5-97.5-144.6C69 633.3 57 573.7 57 512.2c0-61.4 12-121 35.7-177.1 23-54.1 55.8-102.8 97.6-144.6z" fill="#ff2e4d" p-id="10059"></path><path d="M357.2 566.8c3.3-2.1 7.1-3.2 10.8-3.2 6.6 0 13.1 3.3 16.9 9.2l100.9 158c1.8 2.8 3.9 5.2 6.3 7.2V259c0-11.1 9-20 20-20 11.1 0 20 8.9 20 20v479c2.4-2 4.5-4.4 6.3-7.2l100.9-158c5.9-9.3 18.3-12 27.6-6.1 9.3 6 12 18.3 6.1 27.6L572 752.5c-13.2 20.6-35.6 32.9-60 32.9s-46.9-12.3-60-32.9l-100.9-158c-6-9.3-3.3-21.7 6.1-27.7z" fill="#ff2e4d" p-id="10060"></path></svg></div>'
			let noteDetailMaskElement = document.querySelector('.note-detail-mask')
			let downloadBtnElement = document.getElementById('download_btn')
			if(noteDetailMaskElement && (!downloadBtnElement)){
				noteDetailMaskElement.insertAdjacentHTML('beforeend', downloadBtn)
			}
			if(downloadBtnElement){
				downloadBtnElement.addEventListener('click',() => {
					let pictureList = []
					let swiperSlideElement = document.querySelectorAll('.swiper-slide')
					if(swiperSlideElement && swiperSlideElement.length > 0){
						swiperSlideElement.forEach((item) => {
							let picture_url = item.style.backgroundImage.replace('url("', '').replace('")','')
                            if(pictureList.indexOf(picture_url) == -1){
                                pictureList.push(picture_url)
                            }
						})
						try {
							var isFileSaverSupported = !!new Blob;
							if(pictureList && pictureList.length >0){
							    pictureList.forEach((item,index) => {
							        saveAs(item, 'image_' + index +'.jpg')
							    })
						    }
						} catch (e) {
							alert('当前浏览器暂不支持下载！')
						}
					}
				},false)
			}
		},1500)
	}

	let observer = new MutationObserver(observerCallback)

	if(mainContentElement){
		observer.observe(mainContentElement, observerConfig)
	}
})();
