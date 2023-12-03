// custom-tab-bar/index.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {
    active: 0
  },

  /**
   * Component methods
   */
  methods: {
    onChange(event) {
      console.log(event.detail);
    }
  }
})
