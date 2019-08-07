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
    var MyCommponent=Vue.extend(MessageBox);
    return function(opts){//配置参数
    
        for(var attr in opts){
            defaults[attr]=opts[attr];
        }
        

        var vm = new MyCommponent ({
            el:document.createComment('div'),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok,
            },
            methods:{
                handleCancel(){
                    defaults.handleCancel&&defaults.handleCancel.bind(this);
                    //删除弹窗
                    document.body.removeChild(vm.$el);
                },
                handleOk(){
                    defaults.handleOk&&defaults.handleOk.bind(this);
                    document.body.removeChild(vm.$el);
                }
            }
        })
        //添加弹窗
        document.body.appendChild(vm.$el);

    }

})();