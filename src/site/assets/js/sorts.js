Vue.component("visual-sort", {
  template: `
  <div>
    <!--<div class="iterations">Итерации: {{ iteration }}</div>-->
    <div class="sort-elements">
      <div class="first" :style="{height: _length * height.element + height.label + 'px'}"></div>
      <div
        ref="element"
        v-for="(element, key) in elements"
        :key="key"
        :class="[
          'element',
          {success: success(key)},
          {compared: current(key)},
          {custom: custom(key)},
        ]">
        <div class="element-label">{{ element }}</div>
        <div class="element-body" :style="{height: element * height.element + 'px'}"></div>
      </div>
    </div>
    <div class="pannel">
      <button @click="sort" :disabled="progress" class="default-btn">Sort</button>
      <button @click="clear" class="default-btn">Clear</button>
    </div>
  </div>`,
  props: ["type", "_length", "mobileSize"],
  data() {
    return {
      elements: [],
      iteration: 0,
      successIndex: [],
      comparedIndex: [],
      customIndex: [],
      progress: false
    };
  },
  computed: {
    isSorted() {
      return this.elements.every((e, i, a) => {
        return a.length - 1 !== i ? a[i] < a[i + 1] : true;
      });
    },
    height() {
      return {
        element: this.mobileSize ? 12 : 20,
        label: this.mobileSize ? 18 : 28
      };
    },
    width() {
      return this.mobileSize ? 21 : 40;
    }
  },
  watch: {
    mobileSize() {
      this.clear();
    }
  },
  created() {
    this.elements = randomArray(this._length);
  },
  methods: {
    sort() {
      switch (this.type) {
        case "Bogo":
          this.bogoSort();
          break;
        case "Bubble":
          this.bubbleSort();
          break;
        case "Coctail":
          this.coctailSort();
          break;
        case "Selection":
          this.selectionSort();
          break;
      }
    },
    async bogoSort() {
      if (this.progress) return void 0;
      this.progress = true;
      for (; !this.isSorted; ) {
        if (!this.progress) {
          this.iteration = 0;
          return void 0;
        }
        await pause(25);
        this.iteration++;
        this.elements = this.elements.sort(() => 0.5 - Math.random());
      }
      this.progress = false;
    },
    async bubbleSort() {
      if (this.progress) return void 0;
      this.$refs.element.forEach((i) => {
        i.style.transition = "transform 150ms linear";
      });
      this.progress = true;
      let tempArr = [...this.elements];
      let indexArr = tempArr.map((e, i) => i);
      let len = tempArr.length;
      label: for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
          this.comparedIndex = [indexArr[j], indexArr[j + 1]];
          this.iteration++;
          await pause(150);
          if (!this.progress) break label;
          if (tempArr[j] > tempArr[j + 1]) {
            const el = this.$el.querySelectorAll(".compared");
            const translate1 = getTranslate(el[0])[0];
            const translate2 = getTranslate(el[1])[0];
            el[0].style.transform = `translate(${Math.floor(this.width + translate1)}px)`;
            el[1].style.transform = `translate(${Math.floor(translate2 - this.width)}px)`;
            tempArr = swapItems(tempArr, j, j + 1);
            indexArr = swapItems(indexArr, j, j + 1);
            await pause(150);
          }
        }
        const last = this.successIndex.length ? len - this.successIndex.length : len;
        this.successIndex.push(indexArr[last - 1]);
      }
      // this.progress = false;
      this.$refs.element.forEach((i) => {
        i.style.transition = "none";
        i.style.transform = "translate(0px)";
      });
      this.comparedIndex = [];
      if (this.progress) {
        this.elements = [...tempArr];
      }
    },
    async coctailSort() {
      if (this.progress) return void 0;
      this.$refs.element.forEach((i) => {
        i.style.transition = "transform 150ms linear";
      });
      this.progress = true;
      let tempArr = [...this.elements];
      let indexArr = tempArr.map((e, i) => i);
      let start = 0;
      let end = tempArr.length - 1;
      label: do {
        for (let i = start; i < end; i++) {
          this.iteration++;
          if (!this.progress) break label;
          this.comparedIndex = [indexArr[i], indexArr[i + 1]];
          await pause(150);
          if (tempArr[i] > tempArr[i + 1]) {
            const el = this.$el.querySelectorAll(".compared");
            const translate1 = getTranslate(el[0])[0];
            const translate2 = getTranslate(el[1])[0];
            el[0].style.transform = `translate(${Math.floor(this.width + translate1)}px)`;
            el[1].style.transform = `translate(${Math.floor(translate2 - this.width)}px)`;
            tempArr = swapItems(tempArr, i, i + 1);
            indexArr = swapItems(indexArr, i, i + 1);
            await pause(150);
          }
        }
        this.successIndex.push(indexArr[end]);
        end--;
        for (let i = end; i > start; i--) {
          this.iteration++;
          if (!this.progress) break label;
          this.comparedIndex = [indexArr[i], indexArr[i - 1]];
          await pause(150);
          if (tempArr[i] < tempArr[i - 1]) {
            const el = this.$el.querySelectorAll(".compared");
            const translate1 = getTranslate(el[0])[0];
            const translate2 = getTranslate(el[1])[0];
            el[0].style.transform = `translate(${Math.floor(this.width + translate1)}px)`;
            el[1].style.transform = `translate(${Math.floor(translate2 - this.width)}px)`;
            tempArr = swapItems(tempArr, i - 1, i);
            indexArr = swapItems(indexArr, i - 1, i);
            await pause(150);
          }
        }
        this.successIndex.push(indexArr[start]);
        start++;
      } while (start < end);
      this.$refs.element.forEach((i) => {
        i.style.transition = "none";
        i.style.transform = "translate(0px)";
      });
      this.comparedIndex = [];
      if (this.progress) {
        this.elements = [...tempArr];
      }
    },
    async selectionSort() {
      if (this.progress) return void 0;
      this.progress = true;
      let tempArr = [...this.elements];
      const len = tempArr.length;
      label: for (let i = 0; i < len; i++) {
        let min = i;
        this.customIndex = [i];
        await pause(130);
        for (let j = i + 1; j < len; j++) {
          if (!this.progress) break label;
          this.iteration++;
          this.comparedIndex = [j];
          await pause(180);
          if (tempArr[min] > tempArr[j]) {
            min = j;
            this.customIndex = [j];
            await pause(50);
          }
        }
        if (min !== i) {
          tempArr = swapItems(tempArr, i, min);
          this.elements = [...tempArr];
        }
        this.successIndex.push(i);
        this.customIndex = [];
        await pause(180);
      }
      this.customIndex = [];
      this.comparedIndex = [];
    },
    clear() {
      this.iteration = 0;
      this.progress = false;
      this.successIndex = [];
      this.elements.sort(() => 0.5 - Math.random());
    },
    current(index) {
      return this.comparedIndex.includes(index);
    },
    custom(index) {
      return this.customIndex.includes(index);
    },
    success(index) {
      return this.successIndex.includes(index);
    }
  }
});

const app = new Vue({
  delimiters: ["[[", "]]"],
  el: "#app",
  data() {
    return {
      mobileSize: false,
      media: null
    };
  },
  mounted() {
    this.media = window.matchMedia("(max-width:730px)");
    this.media.addListener(this.resize);
    this.resize(this.media);
  },
  methods: {
    resize(event) {
      this.mobileSize = !!event.matches;
    }
  }
});
