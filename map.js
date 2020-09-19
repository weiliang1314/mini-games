function map(row, col, width, height) {
    this.arr = []
    this.row = row
    this.col = col

    this.width = width
    this.height = height
        //要渲染到页面，要创建一个元素
    this.dom = document.createElement('div')

}

//添加填充方法
map.prototype.fill = function() {
        for (let j = 0; j < this.row; j++) {
            //要一行一行创建，创建一个行容器
            let row_dom = document.createElement('div')
            row_dom.className = 'rom'
            let row_arr = []
                //将每一行填满
            for (let i = 0; i < this.col; i++) {
                //创建每一个小方格，追加到容器
                let col_dom = document.createElement('span')
                col_dom.className = 'grid'
                row_dom.appendChild(col_dom)
                row_arr.push(col_dom)
            }
            //把创建的每一行追加到dom
            this.dom.appendChild(row_dom)
            this.arr.push(row_arr)
        }
        this.dom.className = 'box'
            //上树
        document.body.appendChild(this.dom)
    }
    //蛇移动后清除，原来的格子
map.prototype.clear = function() {
    for (let i = 0; i < this.arr.length; i++) {
        for (let j = 0; j < this.arr[i].length; j++) {
            //改变小方格颜色
            this.arr[i][j].style.backgroundImage = "none"
        }
    }
}