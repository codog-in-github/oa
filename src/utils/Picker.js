import Vue from 'vue';
import { objectMap } from '.';

const container = document.createElement('div');
document.body.appendChild(container);
const createChildren = config => {
  if (config.name === 'el-checkbox-group') {
    return config.children?.map(item =>
      vm.$createElement('el-checkbox', { props: { label: item.value, key: item.value } }, item.label)
    );
  } else if (config.name === 'el-radio-group') {
    return config.children?.map(item =>
      vm.$createElement('el-radio', { props: { label: item.value, key: item.value } }, item.label)
    );
  }
};
let _resolve = () => {}; let _reject = () => {};
const vm = new Vue({
  data () {
    return {
      visible: false,
      formData: {},
      form: {}
    };
  },
  methods: {
    onCancel () {
      this.visible = false;
      _reject();
    },
    onConfirm () {
      this.visible = false;
      _resolve(this.formData);
    }
  },
  render (h) {
    return <ElDialog
      visible={this.visible} onClose={() => this.onCancel()}
    >
      <ElForm labelWidth="120px">{objectMap(this.form, (key, val) => {
        return <ElFormItem label={val.label}>{h(val.name, {
          props: {
            value: this.formData[key],
            ...val.props
          },
          on: {
            input: val => {
              this.formData[key] = val;
            }
          }
        }, createChildren(val))}</ElFormItem>;
      })}
      </ElForm>
      <div slot="footer">
        <ElButton type="primary" onClick={this.onConfirm}>OK</ElButton>
        <ElButton onClick={this.onCancel}>CANCEL</ElButton>
      </div>
    </ElDialog>;
  }
});

vm.$mount(container);

export function pick (form) {
  return new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
    vm.visible = true;
    const data = {};
    for (const key in form) {
      data[key] = form[key].default ?? null;
    }
    vm.formData = data;
    vm.form = form;
  });
}
