// components/steper/steper.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateCount(e) {
      let count = Number(e.currentTarget.dataset.count);
      let c = this.data.count + count;
      if (c == 0) {
        return;
      }

      this.setData({
        count: c
      })
    }
  }
})