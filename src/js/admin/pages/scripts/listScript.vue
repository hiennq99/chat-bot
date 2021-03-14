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
            <label for="id-script">Id</label>
            <input
              type="text"
              class="form-control"
              id="id-script"
              disabled
              :value="id"
            />
          </div>
          <div class="form-group">
            <label for="id-content">Tên kịch bản</label>
            <b-form-select
              v-model="scriptSelected"
              :options="listScript"
            ></b-form-select>
          </div>
          <div class="form-group">
            <label for="id-content">Câu hỏi</label>
            <b-form-select
              v-model="selected"
              :options="options"
              multiple
            ></b-form-select>
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
        },
        {
          key: "name_script",
          label: "Tên kịch bản",
          class: "text-center",
        },
        {
          key: "question",
          label: "Câu hỏi",
          class: "text-center",
        },
        {
          key: "position",
          label: "Vị trí câu hỏi",
          class: "text-center",
        },
        { key: "actions", class: "text-right" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      title: "Thêm mới kịch bản ",
      script: "",
      id: "",
      updateItem: true,
      selected: [],
      options: [{ value: null, text: "Chọn câu hỏi" }],
      listScript: [],
      scriptSelected: 1,
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
      create: "scripts/create",
      updatescript: "scripts/update",
      getListScriptQuestion: "scripts/getListScriptQuestion",
      deletescript: "scripts/delete",
      getListQuestion: "questions/getListQuestion",
      getListScript: "scripts/getListScript",
    }),
    async info(item) {
      this.script = item.content;
      this.id = item.id;
      this.updateItem = true;
    },
    async deleteItem(item) {
      await this.deletescript(item.id);
      await this.fetchData();
    },
    async fetchData() {
      this.items = await this.getListScriptQuestion();
      let ques = await this.getListQuestion();
      this.listScript = await this.getListScript();
      let optionQues = [];
      optionQues.push({ value: null, text: "Chọn câu hỏi" });
      ques.forEach((element) => {
        let item = {};
        item.value = element.id;
        item.text = element.question;
        optionQues.push(item);
      });
      let opitonScript = [];
      opitonScript.push({ value: null, text: "Chọn kịch bản" });
      this.listScript.forEach((element) => {
        let item = {};
        item.value = element.id;
        item.text = element.name_script;
        opitonScript.push(item);
      });
      this.listScript = opitonScript;
      this.options = optionQues;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    async submit() {
      if (!this.updateItem) {
        await this.create({
          scripts: this.scriptSelected,
          questions: this.selected,
        });
      } else {
        await this.updateScript({
          id: parseInt(this.id),
          data: { script: this.script },
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