<template>
  <div class="city_body">
    <Loading v-if="isLoading" />
    <div class="city_list" v-else>
      <Scroller ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)" >{{itemList.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading:true
    };
  },
  mounted() {
    // 获取本地存储
    var cityList=window.localStorage.getItem('cityList');
    var hotList=window.localStorage.getItem('hotList');
    if(cityList&&hotList){
      //将字符串解析回来
      this.cityList=JSON.parse(cityList);
      this.hotList=JSON.parse(hotList);
      this.isLoading=false;
    }else{
    this.axios.get("/api/cityList").then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.isLoading=false;
        var cities = res.data.data.cities;
        //转换数据格式
        // [{index:'A',list:[{nm:"阿城",id:123}]}]
        var { cityList, hotList } = this.formatCityList(cities);
        this.cityList = cityList;
        this.hotList = hotList;
        // console.log(this.hotList)
        //对请求的城市列表 进行本地存储
        // JSON.stringify(cityList)将cityList数组转换成字符串形式
        window.localStorage.setItem('cityList',JSON.stringify(cityList));
        window.localStorage.setItem('hotList',JSON.stringify(hotList));
      }
    });
  }
  },
  methods: {
    formatCityList(cities) {
      // 城市分类
      var cityList = [];
      //热门城市
      var hotList = [];

      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }

      for (var i = 0; i < cities.length; i++) {
        //提取每个城市拼音的首字母 并转换成大写
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          //新添加索引
          //转换数据格式 并添加到cityList中
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //累加到已有索引
          for (var j = 0; j < cityList.length; j++) {
            //如果某一项数据的索引与组名相同
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      return {
        cityList,
        hotList
      };
    },
    //点击索引跳转到相应位置的方法
    handleToIndex(index) {
      //获取h2元素
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      //设置滚动的位置
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      //h2[index].offsetTop作为参数y传入  加-号是为了向下滚动
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
    },
    handleToCity(nm,id){
      this.$store.commit('city/CITY_INFO',{nm,id});
      //本地存放上一次选择的城市
      window.localStorage.setItem('nowNm',nm);
      window.localStorage.setItem('nowId',id);
      //利用编程式路由进行跳转
      this.$router.push('./movie/nowPlaying');
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
