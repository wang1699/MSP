const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const listSong = $('.list-song')

const nameSong = $('.name-song')
const cdImg = $('.cd-img')
const cd = $('.cd')
const audio = $('.audio')
const repeat = $('.repeat')
const prev = $('.prev')
const pause = $('.pause')
const next = $('.next')
const random = $('.random')
const progress = $('.progress')
const audioVolume = $('.audio-volume')

 const app = {
    currentIndex:0,
    isPlaying : false,
    isRandom : false,
    isRepeat: false,
    arr:[0],

    songs : [
        {
            name:'Bản tình ca không hoàn thiện',
            singer:'Mr.Q',
            // path: "./Music/song 1.mp3",
            path: './Music/song 1.mp3',
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
        {
            name:'Tối',
            singer:'Mr.U',
            path: "./Music/Toi.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
        {
            name:'Ngày bên em',
            singer:'Mr.A',
            path: "./Music/NBE.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
        {
            name:'Không thuộc về',
            singer:'Mr.N',
            path: "./Music/KTV.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
       
        {
            name:'Cảm ơn vì tất cả',
            singer:'Mr.G',
            path: "./Music/COVTC.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'

        },
        {
            name:'Thu cuối',
            singer:'2',
            path: "./Music/song 2.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
        {
            name:'Từ chối nhẹ nhàng thôi',
            singer:'K',
            path: "./Music/song 4.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
        {
            name:'Đoạn tuyệt nàng đi',
            singer:'3',
            path: "./Music/DTND.mp3",
            image: './img/spirits_roads_by_ethemos_df7r3lm.jpg'
        },
         
        

        

    ],
   
    render:function(){
        var html = this.songs.map(function(song,index){
            return `<div class="song ${index == 0?'active':''}" data-index= ${index}>
                     
            <img class="song-img" src="${song.image}" alt="">
             
            <div class="song-element">
                <p class="song-name">${song.name}</p>
                <p class="song-singer">${song.singer}</p>
            </div>
        </div>`
        })
        listSong.innerHTML = html.join('')
    },
    defineProperties:function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handelEvents:function(){
        var _this = this
        audioVolume.onchange = function(){
            audio.volume= this.value /100
        }



        const cdAnimate = cd.animate(
            [
                {transform :'rotate(360deg'}
            ],{
                duration:5000,
                iterations:Infinity
            }
        )
        cdAnimate.pause()
        pause.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
                
            }else{
                audio.play()
                 
            }
        }
        audio.onplay = function(){
            _this.isPlaying= true
            cdAnimate.play()
            pause.classList.add('active')

        }
        audio.onpause = function(){
            _this.isPlaying= false
            cdAnimate.pause()
            pause.classList.remove('active')

        }
        audio.ontimeupdate= function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
                 
                progress.value = progressPercent
            }

        }
       
       

        progress.ontouchend=function(e){
                
                 const currentX = this.offsetWidth
                     console.log(currentX)
                     
                         const offsetX = Number.parseInt(this.value)
             
                        audio.currentTime = offsetX /  100 *audio.duration
               
            }
        
        next.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.renderAfter()
            _this.scrollToActiveSong()
        }
        prev.onclick= function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.renderAfter()
            _this.scrollToActiveSong()

        }
        random.onclick = function(){
            if(_this.isRandom){
                _this.isRandom = false
                random.classList.remove('active')
            }else{
                _this.isRandom = true
                random.classList.add('active')
            }
            
        }
        repeat.onclick = function(){
            if(_this.isRepeat){
                _this.isRepeat = false
                repeat.classList.remove('active')
            }else{
                _this.isRepeat = true
                repeat.classList.add('active')
            }
        }
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                next.click()
            }
        }

        listSong.onclick = function(e){
            const songElm = e.target.closest('.song:not(.active)')
             if( songElm){
                _this.currentIndex = Number(songElm.dataset.index)
                _this.loadCurrentSong()
                _this.renderAfter()
                audio.play()
            }
             
        }
    },
    renderAfter: function(){
        const songElement = $$('.song')
        for(var i of songElement){
            i.classList.remove('active')
        }
            
        this.songs.map(function( a ,index){
           if(index == app.currentIndex){
            songElement[index].classList.add('active')
           }
        })
    },
    randomSong:function(){
        let a
         a = Math.floor(Math.random()* this.songs.length)

        if(!this.arr.includes(a)){
            this.arr.push(a) 
            this.currentIndex =a
            this.loadCurrentSong()
            if(this.arr.length == this.songs.length){
               this.arr.length = 0
            }
        } else{
            this.randomSong()
        }
    },
    nextSong:function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong:function(){
        this.currentIndex--
        if(this.currentIndex<0){
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },
    loadCurrentSong:function(){
        var _this = this
        nameSong.textContent = this.currentSong.name
        Object.assign(cdImg.style,{
            background:' url('+this.currentSong.image +') left /cover'
        }) 
        audio.src = this.currentSong.path
    },
    scrollToActiveSong:function(){
            
        $('.song.active').scrollIntoView({
            behavior:'smooth',
            block:'nearest'
        })
    },
    start:function(){
        this.defineProperties()
        this.loadCurrentSong()
        this.handelEvents()
        this.render()
    }


 }
 app.start()