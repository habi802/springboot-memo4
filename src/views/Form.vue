<script setup>
  import httpService from '@/services/HttpService';
  import { reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const state = reactive({
    memo: {
      id: 0,
      title: '',
      content: '',
      createdAt: '',
    }
  });

  onMounted(() => {
    const passData = history.state.data;
    if (passData) {
      state.memo = JSON.parse(passData);
    }
  });

  const procSubmit = async () => {
    const jsonBody = {
      title: state.memo.title,
      content: state.memo.content
    };

    let data = null;
    let path = '/';
    if (state.memo.id) {
      // 수정
      jsonBody.id = state.memo.id;
      data = await httpService.modify(jsonBody);
      path = `/memo/${state.memo.id}`;
    } else {
      // 등록
      data = await httpService.save(jsonBody);
    }
    
    if (data.resultData === 1) {
      // 주소가 "/" 으로 라우팅 처리 하고 싶다.
      // 수정하면 Detail.vue 로 가게 해주시요.
      router.push({ path });
    } else {
      alert(data.resultMessage);
    }
  }
</script>

<template>
  <form class="detail" @submit.prevent="procSubmit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" class="form-control p-3" v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea id="content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">
      {{ state.memo.id > 0 ? '수정' : '저장' }}
    </button>
  </form>
</template>

<style scoped>

</style>