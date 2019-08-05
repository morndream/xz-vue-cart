<template>
  <div class="product_app">
   <div class="goods-items"
    v-for="(item,i) of list"  :key="i">
     <img :src="'http://127.0.0.1:3000/img/'+item.img_url">
     <h4>{{item.title}}</h4>
     <div class="info">
       <span class="now">{{item.price}}</span>
     </div>
   </div>
  <!-- 按钮 -->
  <mt-button size="large" type="primary" @click="loadMore" :disabled="disa">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[],
      pno:0,//页码
      ps:4, //页大小
      disa:false
    }
  },
  methods:{
    loadMore(){//加载更多的数据
      var url="product";
      // 将当前页码加1
      this.pno++;
      // 创建参数对象
      var obj={pno:this.pno,pageSize:this.ps};
      this.axios.get(url,{params:obj}).then(result=>{
        // 数据覆盖
        //  this.list=result.data.data;
        // 数据追加
        var rows=this.list.concat(result.data.data);
        this.list=rows;
        if(this.pno==result.data.pc){
           this.disa=true;
        }
    })
    }
  },
  created(){
    this.loadMore();
  }
}
</script>
<style scope>
  .product_app{
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
    padding:4px;
  }
  .product_app .goods-items{
    width:49%;
    border:1px solid #ccc;
    box-sizing:border-box;
    margin:2px 0;
    padding:2px;
    /* background:#fff; */
    border-radius:5px;/*圆角*/
    display:flex; /*  弹性布局*/
    flex-direction:column;
    min-height:247px;    /*最小高度*/
  }
  /* 商品图片，充满父元素 */
  .product_app .goods-items img{
     width:100%;
   }
</style>
