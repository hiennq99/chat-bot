<template>
  <div class="py-4">
    <button
      class="btn btn-outline-blue mb-4"
      @click="
        showModal();
        updateItem = false;
        id = '';
      "
    >
      Thêm mới
    </button>
    <b-container fluid>
      <!-- Main table element -->
      <b-table
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        stacked="md"
        show-empty
        small
      >
        <template #cell(name)="row">
          {{ row.value.first }} {{ row.value.last }}
        </template>

        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="
              info(row.item);
              showModal();
            "
            class="mr-1"
            variant="success"
          >
            Sửa
          </b-button>
          <b-button
            size="sm"
            class="btn-bg-warning"
            variant="danger"
            @click="deleteItem(row.item)"
          >
            Xóa
          </b-button>
        </template>
      </b-table>
      <!-- Info modal -->
      <b-modal ref="my-modal" hide-footer :title="title">
        <div>
          <div class="form-group">
            <label for="id-Answer">Id</label>
            <input
              type="email"
              class="form-control"
              id="id-Answer"
              disabled
              :value="id"
            />
          </div>
          <div class="form-group">
            <label for="id-content">Nội dung</label>
            <input
              type="email"
              class="form-control"
              id="id-content"
              placeholder="Nhập câu hỏi"
              autofocus
              v-model="Answer"
            />
          </div>
        </div>
        <div class="text-right">
          <b-button class="mt-3" variant="primary" block @click="submit()"
            >Lưu</b-button
          >
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "id",
          label: "id",
          sortDirection: "desc",
        },
        {
          key: "id_question",
          label: "Câu hỏi tiếp theo",
          class: "text-center",
        },
        {
          key: "content",
          label: "Câu trả lời",
          class: "text-center",
        },
        { key: "actions", class: "text-right" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      title: "Thêm câu trả lời",
      Answer: "",
      id: "",
      updateItem: true,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    ...mapActions({
      createAnswer: "answers/createAnswer",
      updateAnswer: "answers/updateAnswer",
      getListAnswer: "answers/getListAnswer",
      deleteAnswer: "answers/deleteAnswer",
    }),
    async info(item) {
      this.Answer = item.content;
      this.id = item.id;
      this.updateItem = true;
    },
    async deleteItem(item) {
      await this.deleteAnswer(item.id);
      await this.fetchData();
    },
    async fetchData() {
      this.items = await this.getListAnswer();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    async submit() {
      if (!this.updateItem) {
        await this.createAnswer({ content: this.Answer });
      } else {
        await this.updateAnswer({
          id: this.id,
          data: { content: this.Answer },
        });
      }
      this.hideModal();
      this.fetchData();
    },
  },
  watch: {
    updateItem: function (val) {
      val
        ? (this.title = "Cập nhật câu trả lời")
        : (this.title = "Thêm câu trả lời");
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>