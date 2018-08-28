
Eagle.getURL = function(){
  return 'http://127.0.0.1:5500/demo/index.html';
};

Eagle.addRequestFilter(async function(option) {
  if (!option.options.headers) {
    option.options.headers = {};
  }
  option.options.headers['Custom'] = await new Promise((resolve, reject) => {
    resolve('1000');
  });
});

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