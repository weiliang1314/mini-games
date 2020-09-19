function game(m, f, s, b) {
    this.m = m
    this.b = b
    this.s = s
    this.f = f
    this.timer = null
    this.run()
        //定义，游戏撞墙结束时不再渲染
    this.flag = true


}

//渲染地图
game.prototype.rend = function() {
        this.m.fill()

    }
    //食物渲染
game.prototype.rendfoot = function() {
        // this.m.dom.childNodes[this.f.x].childNodes[this.f.y].style.backgroundColor = 'red'
        //地图中数组，食物位置
        this.m.arr[this.f.x][this.f.y].style.backgroundImage = 'url(./img/4.png)'
    }
    //渲染蛇
game.prototype.rendsneck = function() {
    //获取头部
    let head = this.s.arr[this.s.arr.length - 1]
    this.m.arr[head.row][head.col].style.backgroundImage = "url(" + this.s.head_pic[0] + ")"
        //渲染蛇在图中每一节身体坐标
    for (let i = 0; i < this.s.arr.length - 1; i++) {
        let row = this.s.arr[i].row;
        let col = this.s.arr[i].col;
        //  this.m.arr[row][col].style.backgroundColor = "green"
        this.m.arr[row][col].style.backgroundImage = "url(" + this.s.body_pic[0] + ")"

    }
    //蛇的尾部
    let tail = this.s.arr[0]
    this.m.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.s.tail_pic[0] + ")"


}
game.prototype.run = function() {
        this.rend()
        this.rendfoot()
        this.rendsneck()
        this.rendback()
        this.star()
        this.bindevent()



    }
    //开始的方法
game.prototype.star = function() {
        this.flag = true

        //缓存this
        let me = this
        this.timer = setInterval(function() {

            //移动
            me.s.move()
                //是否撞墙
            me.checkmap()
                //是否吃的食物
            me.checkfood()
                //是否吃到自己或障碍物
            me.checkback()
            me.checksneck()

            if (me.flag) { //清屏
                me.m.clear()
                    //渲染
                me.rendfoot()
                me.rendsneck()
                    //渲染障碍物
                me.rendback()
            }


        }, 400)
    }
    //绑定键盘事件
game.prototype.bindevent = function() {
        //在一个类原型方法中获取实例化对象方法，this不要出现其他全局变量,除了window,document
        let me = this
            //键盘事件
        document.onkeydown = function(event) {
            //获取用户按下
            let code = event.keyCode
            if (code === 37 || code === 38 || code === 39 || code === 40) {
                me.s.chande(code)

            }

        }
    }
    //边届判断
game.prototype.checkmap = function() {
        //蛇的头部
        let head = this.s.arr[this.s.arr.length - 1]
            //与地图行列进行判定
        if (head.row < 0 || head.row >= this.m.row || head.col < 0 || head.col >= this.m.col) {

            //撞墙了
            //结束游戏
            this.gameover()
            alert('游戏结束了')



        }
    }
    //游戏结束
game.prototype.gameover = function() {
        this.flag = false
        clearInterval(this.timer)



    }
    //检测蛇吃食物
game.prototype.checkfood = function() {
        //蛇的头部
        let head = this.s.arr[this.s.arr.length - 1]
            //获取食物
        let food = this.f
            //蛇的头部是否与食物重合
        if (head.row === food.x && head.col === food.y) {
            //蛇长长
            this.s.growup()
                //食物位置重置
            this.restfood()
        }
    }
    //食物位置重置方法
game.prototype.restfood = function() {
        //随机x,y
        let x = parseInt(Math.random() * this.m.row)
        let y = parseInt(Math.random() * this.m.col)
            //xy不能出现在蛇的身体上
            //遍历
        for (let i = 0; i < this.s.arr.length; i++) {
            let one = this.s.arr[i]
            if (one.row === x && one.col === y) {
                //递归
                this.restfood()
                return;

            }
        }
        //食物是否与障碍物位置重合
        for (let i = 0; i < this.b.arr.length; i++) {
            let one = this.b.arr[i]
            if (one.row === x && one.col === y) {
                //递归
                this.restfood()
                return;

            }
        }
        this.f.rest(x, y)

    }
    //蛇吃到自己
game.prototype.checksneck = function() {
        //蛇的头部
        let head = this.s.arr[this.s.arr.length - 1]
        for (let i = 0; i < this.s.arr.length - 1; i++) {
            let one = this.s.arr[i]
            if (head.row === one.row && head.col === one.col) {
                //结束游戏
                this.gameover()
                alert('游戏结束了')

            }
        }
    }
    //渲染障碍物
game.prototype.rendback = function() {
        //循环障碍
        for (let i = 0; i < this.b.arr.length; i++) {
            let row = this.b.arr[i].row;
            let col = this.b.arr[i].col;

            this.m.arr[row][col].style.backgroundImage = "url(" + this.b.img + ")"

        }
    }
    //蛇碰到障碍物
game.prototype.checkback = function() {
    //蛇的头部
    let head = this.s.arr[this.s.arr.length - 1]
    for (let i = 0; i < this.b.arr.length - 1; i++) {
        let one = this.b.arr[i]
        if (head.row === one.row && head.col === one.col) {
            //结束游戏
            this.gameover()
            alert('游戏结束了')
        }
    }
}