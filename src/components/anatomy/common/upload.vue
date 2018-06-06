<template>
  <div class="upload">
    <el-upload class="upload__file" :show-upload-list="false" :before-upload="handleBefore" :on-success="handleSuccess" :data="extData" action="http://yikan-t.oss-cn-hangzhou.aliyuncs.com" multiple>
      <img class="upload__addimg" src="~src/assets/img/anatomy/detail/picture-plus.png" alt="">
    </el-upload>
  </div>
</template>

<script>
import getName from 'src/utils/getName.js';

export default {
  data() {
    return {
      indexStart: 0,
      indexEnd: 0,
      pics: [],
      key: 'yikan-t/',
    }
  },
  props: ['extData', 'form'],
  methods: {
    handleBefore(file) {
      let type = file.name.split('.')[1];
      this.extData.key = this.key + getName() + '.' + type;
      this.pics.push(this.extData.key);
      this.indexStart += 1;
    },
    handleSuccess(res, file, fileList) {
      this.indexEnd += 1;
      if (this.indexEnd == this.indexStart) {
        this.form.pics = this.form.pics.concat(this.pics);
        this.indexEnd = 0;
        this.indexStart = 0;
        this.pics = [];
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/config';
.upload {
  &__file {
    width: Rem(70);
  }
  &__addimg {
    width: Rem(70);
  }
}
</style>
