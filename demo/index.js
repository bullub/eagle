Eagle.getURL = function(){
  return 'https://www.baidu.com';
};

const Index = Eagle.extend({
  constructor: function Index() {
    //调用父类构造器
    Index._Parent(this, arguments);
    this.aa();
  },
  async aa() {
    return new Promise(resolve => {
      resolve(10);
    });
  },
  /**********************************请求回调******************************************/
  responseHandlers: {
  },
  /**********************************事件声明******************************************/
  events: {
    'click div': 'bodyClicked'
  },
  /*********************************事件处理器*****************************************/
  eventHandlers: {
    async bodyClicked(e, $el) {
      console.log(await this.aa());
      let response = await this.request('EMS', '', {});

      console.log(response);
    }
  }
});
let index = new Index();