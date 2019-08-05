<template>
  <div class="cart">
    <!-- 全选按钮 -->
    <div class="selectAll">
     全选
     <input type="checkbox" @change="selectAll" v-model="selectA">
    </div>
    <!-- 商品列表 -->
    <div class="cart-item" v-for="(item,i) of list" :key="i">
      <div class="leftImgText">
        <input type="checkbox" v-model="item.cb" @change="select">
        <img :src="'http://127.0.0.1:3000/img/'+item.img_url">
        <div class="price">
          <span>{{item.price}}</span>
        </div>
      </div>
      <mt-button @click="delItem" :data-id="item.id">删除</mt-button>
    </div>
    <!-- 删除选中商品 -->
    <div>
      <mt-button @click="delAll">
        删除选中的商品
      </mt-button>   
      <h3>购物车数量:
        <span style="color:red">{{$store.getters.getCartCount}}</span>
      </h3>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[],
      selectA:false
    }
  },
  methods:{
   loadMore(){
      //  1：创建url
      var url='cart';
      // 2:发送axios请求
      this.axios.get(url).then(result=>{   
        // this.list=result.data.data;
        // 1:获取服务器数组
        var rows=result.data.data;
        // 2：创建循环为数组中每一个对象添加cb属性：cb用来控制商品前复选框
        for(var i=0;i<rows.length;i++){
          // 2.1添加cb属性
            rows[i].cb=false;
          //2.2更新购物车数量
          this.$store.commit("increment");
        }
        // 3：将新数据保存
        this.list=rows;
      })
   },
   selectAll(e){
     var cb=e.target.checked;
     for(var item of this.list){
            item.cb=cb;
     }
   },
   select(){
     var n=0;
     for(var item of this.list){
        if(item.cb==true){
          n++;
        }
    }
    if(n==this.list.length){
       this.selectA=true;
    }else{
      this.selectA=false;
    }
   },
   delItem(e){
    // 1.获取当前商品的id
     var id=e.target.dataset.id;
    //  console.log(id);
    // 2.显示交互确认框
    this.$messagebox.confirm("是否删除指定数据")
    // 3.如果用户选择"确认"
    .then(action=>{
      //  console.log(action)
      var url="delItem";
       var obj={id:id}
       // 4.发送ajax删除数据
      this.axios.get(url,{params:obj}).then(result=>{
        this.$store.commit('clear');
        this.loadMore();
      })      
    }).catch(err=>{
      // 5.如果用户选择取消，则不做操作
      console.log(err)
    })
      
   },
   delAll(){
    //  创建变量保存空字符串
     var str='';
    //  创建循环拼接字符串内容
     for(var item of this.list){
        if(item.cb){
              str+=item.id+','; 
        }   
     }
    //  var ids=str.substring(0,str.length-1);
    var ids=str.slice(0,-1);
    if(ids.length==0){
           this.$toast("请选中商品");
           return;
    }
      // 判断如果用户没选商品提示请选择商品，发送ajax请求
     this.$messagebox.confirm("是否删除指定数据").then(action=>{
        this.axios.get('delAll',{params:{ids}}).then(result=>{
             this.$store.commit('clear');
             this.loadMore();
        })
     }).catch(err=>{})
    }
  },
  created(){
      this.loadMore();
  }

}
</script>
<style scope>
/* 最外层弹性布局 */
  .cart-item{
    display:flex;
    justify-content: space-between;
    align-items:center;
    border-bottom:1px solid #ccc;
  }
  /*  */
  .leftImgText{
    display:flex;
    align-items:center;
  }
  .leftImgText img{
    width:50px;
    height:50px;
  }
</style>