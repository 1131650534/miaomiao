import Vue from 'vue';
import MessageBox from './MessageBox';
//闭包
export var messageBox=(function(){

    var defaults={//默认值
        title:'',
        content:'',
        cancel:'',
        ok:'',
        handleCancel:null,
        handleOk:null
    }
    //让vue组件和js结合在一起
    var MyCommponent=Vue.extend(MessageBox);
    return function(opts){//配置参数
        //对默认值进行覆盖
        for(var attr in opts){
            defaults[attr]=opts[attr];
        }
        

        var vm = new MyCommponent ({
            el:document.createElement('div'),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok,
            },
            methods:{
                handleCancel(){
                    //这里用bind没法触发 所以用call
                    defaults.handleCancel&&defaults.handleCancel.call(this);
                    //删除弹窗
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    //这里用bind没法触发 所以用call
                    defaults.handleOk&&defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        })
        //添加弹窗
        document.body.appendChild(vm.$el);

    }

})();