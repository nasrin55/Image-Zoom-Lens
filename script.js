const imgContainer = document.querySelector('.img-container')
const img = document.querySelector('.img-container img')
const lens = document.querySelector('.lens')

imgContainer.addEventListener('mouseenter', function (){
    lens.style.display = 'block'
    imgZoom(3)
})
imgContainer.addEventListener('mouseleave', function () {
    lens.style.display = 'none';
})



function imgZoom(zoom){
    const imgWidth = img.width
    const imgHeight = img.height
    const halfLensWidth = lens.offsetWidth / 2
    const halfLensHeight = lens.offsetHeight / 2

    lens.style.backgroundImage = `url(${img.src})`
    lens.style.backgroundSize = `${imgWidth * zoom}px ${imgHeight * zoom}px`

    img.addEventListener('mousemove', moveLens)
    lens.addEventListener('mousemove', moveLens)

    function moveLens(){
        const pos = getCursor()
        let cursorX = pos.x
        let cursorY = pos.y

        //lens boundaries
        //left
        if (cursorX < halfLensWidth / zoom){
            cursorX = halfLensWidth / zoom
        }
        //right
        if(cursorX > imgWidth - halfLensWidth / zoom){
            cursorX = imgWidth - halfLensWidth / zoom
        }
        //top
        if(cursorY < halfLensHeight / zoom){
            cursorY = halfLensHeight / zoom
        }
        //bottom
        if(cursorY > imgHeight - halfLensHeight / zoom){
            cursorY = imgHeight - halfLensHeight / zoom
        }

        //set lens position
        lens.style.left = cursorX - halfLensWidth + 'px'
        lens.style.top = cursorY - halfLensHeight + 'px' 

        //set lens background position
        lens.style.backgroundPosition = `-${cursorX * zoom - halfLensWidth}px -${cursorY * zoom - halfLensHeight}px`
    }
}

function getCursor(){
    let bounds = img.getBoundingClientRect()

    let x = window.event.pageX - bounds.left - window.pageXOffset
    let y = window.event.pageY - bounds.top - window.pageXOffset

    return { x, y }
}