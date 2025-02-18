document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const textInput = document.getElementById('textInput');
    const clearInput = document.getElementById('clearInput');
    const letterImages = {};

    // Preload letter images
    const letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const sizes = '012345678';
    letters.split('').forEach(letter => {
        sizes.split('').forEach(size => {
            const img = new Image();
            img.src = `letters/${letter}${size}.png`;
            letterImages[`${letter}${size}`] = img;
        });
    });

    textInput.addEventListener('input', () => {
        const text = textInput.value.toLowerCase();
        const words = text.split(' ');
        canvas.height = words.length * 800;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const lastImage = letterImages[`${word[word.length - 1]}${word.length - 1}`];
            const middleHeight = lastImage ? (lastImage.height / 2 + (lastImage.height * i)) : 0;
            for (let i = 0; i < word.length; i++) {
                const letter = word[i];
                if (letterImages[`${letter}${i}`]) {
                    const img = letterImages[`${letter}${i}`];
                    const width = img.width;
                    const height = img.height;
                    let x = canvas.width / 2 - (width / 2);
                    let y = middleHeight - (height / 2);
                    ctx.drawImage(img, x, y);
                }
            }
        }
    });

    clearInput.addEventListener('click', () => {
        textInput.value = '';
        textInput.dispatchEvent(new Event('input'));
    });
});