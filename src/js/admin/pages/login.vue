<template>
    <div style="background: url('images/background.jpg')">
        <div class="flex-center vh-100">
            <div class="col-xl-8">
                <div class="row no-gutters">
                    <div
                        class="col-lg-6 d-none flex-center d-lg-flex bg-gray-100"
                    >
                        <img
                            src="images/login.png"
                            alt="login-img"
                            class="img-fluid"
                        />
                    </div>
                    <div class="col-lg-6 bg-white p-5 mx-auto">
                        <h4 class="my-3 text-uppercase text-center">
                            Đăng nhập
                        </h4>
                        <div>
                            <form @submit.prevent="onSubmit">
                                <fieldset class="form-group position-relative">
                                    <label for="email">Email</label>
                                    <input
                                        v-validate="{
                                            required: true,
                                            email: true
                                        }"
                                        type="text"
                                        class="form-control"
                                        placeholder="Email"
                                        name="Email"
                                        v-model="email"
                                        @focus="onFocus"
                                    />
                                    <span class="small text-danger font-italic"
                                        >{{ errors.first('Email') }}
                                    </span>
                                </fieldset>
                                <fieldset class="position-relative">
                                    <label for="password">Mật khẩu</label>
                                    <input
                                        :type="isShowPw ? 'text' : 'password'"
                                        class="form-control"
                                        placeholder="Mật khẩu"
                                        v-validate="{
                                            required: true,
                                            min: 6
                                        }"
                                        name="password"
                                        data-vv-name="Mật khẩu"
                                        v-model="password"
                                        @focus="onFocus"
                                    />
                                    <div
                                        class="position-absolute fix-positon cursor-pointer"
                                        @mousedown="isShowPw = true"
                                        @mouseup="isShowPw = false"
                                        @touchstart="isShowPw = true"
                                        @touchend="isShowPw = false"
                                    >
                                        <img
                                            src="images/eye.svg"
                                            alt="show-password"
                                            width="21"
                                        />
                                    </div>

                                    <span class="small text-danger font-italic"
                                        >{{ errors.first('Mật khẩu') }}
                                    </span>
                                </fieldset>
                                <div
                                    class="form-group d-flex justify-content-between py-3"
                                >
                                    <b-form-checkbox
                                        v-model="remember"
                                        name="cbRemember"
                                    >
                                        Lưu mật khẩu
                                    </b-form-checkbox>
                                    <router-link to="/forget-password"
                                        >Quên mật khẩu?</router-link
                                    >
                                </div>
                                <div class="d-flex justify-content-between">
                                    <router-link
                                        to="/register"
                                        class="btn btn-outline-primary"
                                        >Đăng kí</router-link
                                    >
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>

                            <section>
                                <div
                                    class="d-block text-center text-nowrap my-3 overflow-hidden"
                                >
                                    <div class="divider-text">
                                        Đăng nhập với
                                    </div>
                                </div>
                                <div class="d-inline">
                                    <a
                                        href="javascript:;"
                                        class="btn btn-outline-blue"
                                        ><img
                                            src="images/facebook.svg"
                                            alt="fb-img"
                                            width="21"
                                    /></a>
                                    <a
                                        href="javascript:;"
                                        class="btn btn-outline-danger"
                                    >
                                        <img
                                            src="images/google.svg"
                                            alt="google-img"
                                    /></a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, Store } from 'vuex';
export default {
    data() {
        return {
            remember: false,
            email: '',
            password: '',
            isShowPw: false
        };
    },
    computed: {
        ...mapState({
            accessToken: state => state.authenticate.accessToken
        })
    },
    methods: {
        ...mapActions({
            login: 'authenticate/login'
        }),
        onSubmit() {
            this.$validator.validateAll().then(async result => {
                if (!result) {
                    return;
                } else {
                    const { email, password, remember, incorrect } = this;
                    const res = await this.login({
                        email,
                        password,
                        remember
                    });
                    if (res.success) {
                        if (remember) {
                            this.$cookie.set('ltt-gate', this.accessToken, {
                                expires: 30
                            });
                        } else {
                            this.$cookie.set('ltt-gate', this.accessToken);
                        }
                        this.$router.push('/');
                    } else {
                        this.errors.add({
                            field: 'Mật khẩu',
                            msg: 'Mật khẩu hoặc tài khoản không đúng'
                        });
                        this.password = '';
                    }
                }
            });
        },
        onFocus() {
            this.errors.remove('Mật khẩu');
        }
    }
};
</script>
<style lang="scss" scoped>
.divider-text {
    position: relative;
    display: inline-block;
    font-size: 0.9375rem;
    padding: 0 1rem;
    background-color: #ffffff;
    &::before {
        right: 100%;
        content: '';
        position: absolute;
        top: 50%;
        width: 9999px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    &::after {
        left: 100%;
        content: '';
        position: absolute;
        top: 50%;
        width: 9999px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
}
.fix-positon {
    top: 40px;
    right: 22px;
}
</style>
