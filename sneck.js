function sneck(pic_obj) {
    this.arr = [
        { row: 4, col: 4 },
        { row: 4, col: 5 },
        { row: 4, col: 6 },
        { row: 4, col: 7 },

    ]


    //方向默认右：编码
    this.direction = 39
        //定义锁,不能同时按下两个键
    this.lock = true
        //定义蛇的头部
    this.head_pic = pic_obj.head_pic
        //定义蛇的身体尾部
    this.body_pic = pic_obj.body_pic
    this.tail_pic = pic_obj.tail_pic
        //定义索引不同的方向，不同的图片
        /* this.head_idx=2
         this.tail_idx=2*/

}
//蛇的移动
sneck.prototype.move = function() {
        //创建头部
        let newhad = {
                row: this.arr[this.arr.length - 1].row,
                col: this.arr[this.arr.length - 1].col

            }
            //判断移动方向
        if (this.direction === 37) {
            //新头部出现在老的头部左边
            //行不变，列减
            newhad.col--

        } else if (this.direction === 38) {
            //新的头部出现在上边，列不变
            newhad.row--

        } else if (this.direction === 39) {
            //新的头部在右边，行不变，列++
            newhad.col++

        } else if (this.direction === 40) {
            //新的头部出现在下方，列不变，行++
            newhad.row++
        }
        //将新的头部添加
        this.arr.push(newhad)
            //去掉尾部
        this.arr.shift()
            //开锁
        this.lock = true
    }
    //转向方法
sneck.prototype.chande = function(direction) {
        if (!this.lock) {
            return
        }
        this.lock = false
            //当用户按下不符合的键与原来方向相同或相反，不反应,绝对值
        if (Math.abs(direction - this.direction) === 0 || Math.abs(direction - this.direction) === 2) {
            return

        } else {
            this.direction = direction
        }
        //定义不同方向头部图片的改变
        /* if(direction===37){
             this.head_pic=0
         }*/
    }
    //蛇的生长
sneck.prototype.growup = function() {
    //获取尾部
    let tail = this.arr[0]
        //添加到尾部，也就是数组的开头
    this.arr.unshift(tail)
}