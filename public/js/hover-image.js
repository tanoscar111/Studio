const container = document.body
		const itemsWrapper = document.querySelector('.grid')

		// Preload images
		const preloadImages = () => {
				return new Promise((resolve, reject) => {
						imagesLoaded(document.querySelectorAll('.content__img'), resolve);
				});
		};
		// And then..
		preloadImages().then(() => {
				// Remove the loader
				document.querySelector('.main').classList.remove('loading');
				const effect = new RGBShiftEffect(container, itemsWrapper, { strength: 0.25 })
		});
		console.log('hover-images')