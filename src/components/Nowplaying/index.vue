<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <!-- <li>
        <div class="pic_show">
          <img src="/images/movie_1.jpg" />
        </div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p>
            观众评
            <span class="grade">9.2</span>
          </p>
          <p>主演: 陈建斌,任素汐,潘斌龙</p>
          <p>今天55家影院放映607场</p>
        </div>
        <div class="btn_mall">购票</div>
        </li>-->
        <li class="pullDown">{{PullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show" @tap="handleToDetail">
            <img :src="item.img | setWH('128.180')" />
          </div>
          <div class="info_list">
            <h2>
              {{item.nm}}
              <img v-if="item.version" src="@/assets/maxs.png" />
            </h2>
            <p>
              观众评
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "Nowplaying",
  data() {
    return {
      movieList: [],
      PullDownMsg: "",
      isLoading: true
    };
  },
  mounted() {
    this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.movieList = res.data.data.movieList;
        //数据加载完成之后 加载logo消失
        this.isLoading = false;
        // this.$nextTick是vue提供的 数据渲染完毕以后触发
        // this.$nextTick(() => {
        //   //两个参数 第一个 在外面包裹的容器的DOM元素 第二个 配置对象
        //   var scroll = new BScroll(this.$refs.movie_body, {
        //     tap: true,
        //     //  probeType: 1 滚动的时候会派发scroll事件，会截流。2滚动的时候实时派发scroll事件，不会截流。 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        //     probeType: 1
        //   });
        //   //滚动时候触发的事件
        //   //pos 检测位置
        //   scroll.on("scroll", pos => {
        //     // console.log('scroll')
        //     if (pos.y > 30) {
        //       this.PullDownMsg = "刷新中···";
        //     }
        //   });

        //   scroll.on("touchEnd", pos => {
        //     if (pos.y > 30) {
        //       this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
        //         if (msg === "ok") {
        //           this.PullDownMsg = "刷新成功！";
        //           //利用定时器 rang 数据渲染延迟一秒钟
        //           setTimeout(() => {
        //             this.movieList = res.data.data.movieList;
        //             this.PullDownMsg = "";
        //           }, 1000);
        //         }
        //       });
        //     }
        //   });
        // });
      }
    });
  },
  methods: {
    handleToDetail() {
      console.log("handleToDetail");
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.PullDownMsg = "刷新中···";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
          if (msg === "ok") {
            this.PullDownMsg = "刷新成功！";
            //利用定时器 rang 数据渲染延迟一秒钟
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.PullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
