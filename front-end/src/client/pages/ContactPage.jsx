import React from 'react'
import Breadcrumb from '../components/Breadcrumb'

const ContactPage = () => {
    return (
        <div>
            <Breadcrumb page="Liên hệ" />
            <section className="page_contact section ">
                <div className="container py-3">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="left-contact px-lg-2">
                                <h1 className="title_page mb-3">Công ty SugerNest</h1>
                                <div className="single-contact">
                                    <i className="fa fa-map-marker" />
                                    <div className="content">
                                        Địa chỉ:
                                        <span>VQCR+GP6, Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam </span>
                                    </div>
                                </div>
                                <div className="single-contact">
                                    <i className="fa fa-phone" />
                                    <div className="content">
                                        Số điện thoại:{" "}
                                        <a className="link" title={19006750} href="tel:19006750">
                                            0374781483
                                        </a>
                                    </div>
                                </div>
                                <div className="single-contact">
                                    <i className="fa fa-envelope" />
                                    <div className="content">
                                        Email:{" "}
                                        <a
                                            title="support@sapo.vn"
                                            className="link"
                                            href="mailto:leminhlongit@gmail.com"
                                        >
                                            leminhlongit@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div id="pagelogin" className="pt-3 mt-3 border-top">
                                    <h2 className="title-head">Liên hệ với chúng tôi</h2>
                                    <form>
                                        <input name="FormType" type="hidden" defaultValue="contact" />
                                        <input name="utf8" type="hidden" defaultValue="true" />
                                        <input
                                            type="hidden"
                                            id="Token-442c3c26de3d42028c24e7d5bd3c7936"
                                            name="Token"
                                            defaultValue="03AFcWeA4wziXyVm2msZtWv8tLwID5_3lhE_68IyfmRQxsfj-R8_IyrXkAITIyTT89SswXz61zUbjztmX92y1FF2ukHdx2qpDHIoNW9AatyUbGm3iftOu3mtNVkNqNRgoB0eaabnt4lhqdCs55lCaYQxl_A_hBHeOzWAFpqPkYJp06SSY4AWP6-KeLW0wF1CSOD8uNAzwFQtQf3yZ9tlzaUNnK09SzcQ8IFPF_QctxTWRa88dgWR5WZY5l5Xkupp_hf5Ht7Z0jvdEjFI6PeH5FckYRYDb2uFsHrBbHslxjwlpiptkQJeemUQF6z3dvemf04ZWUwbrSy2xPuYk9urCS09QkKYS-LxXrG4p16xB9-Rdb42vmfOFpmuhBovZFCG2OimL01URap7NPO5a1Vh5gx3g77sDvcrqoiRglYbzML5XCpitq0JlWCzVj5LdnU37tIINqLpwq4xnOeCHi9H4zcyj6bV30XViLCS4XKiuxx-sqIo_rQGBwX2iZsQHs9l9sUljIDHerbhsznzAuL5SvfK3NGFOELcOcWUc3lk2UzMYUTVvGgRf0N1MKU3xYtVXG51P6R-XA3FEUiHMpTLX2tQRZaFJ_G6fGsUsNqZfYkK2DlzqwnK_18lqPcZUKasnXjisRRwvS5_Hw_BWEei54F2L__Hpq1Om97W7qKAFepyDxxV-E3WtgQ6s"
                                        />
                                        <div className="form-signup clearfix">
                                            <div className="row group_contact">
                                                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input
                                                        placeholder="Họ tên*"
                                                        type="text"
                                                        className="form-control  form-control-lg"
                                                        required=""
                                                        defaultValue=""
                                                        name="contact[Name]"
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input
                                                        placeholder="Email*"
                                                        type="email"
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                        required=""
                                                        id="email1"
                                                        className="form-control form-control-lg"
                                                        defaultValue=""
                                                        name="contact[email]"
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <input
                                                        placeholder="Số điện thoại*"
                                                        type="text"
                                                        className="form-control  form-control-lg"
                                                        required=""
                                                        pattern="\d+"
                                                        name="contact[Phone]"
                                                        defaultValue=""
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <textarea
                                                        placeholder="Nhập nội dung*"
                                                        name="contact[body]"
                                                        id="comment"
                                                        className="form-control content-area form-control-lg"
                                                        rows={5}
                                                        required=""
                                                        defaultValue={""}
                                                    />
                                                </fieldset>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-action btn-block btn-lienhe"
                                                    >
                                                        Gửi liên hệ của bạn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="iFrameMap px-2 mt-3 mt-lg-0">
                                <div id="contact_map" className="map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2145255159858!2d106.78918677583908!3d10.871281657435308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2sUniversity%20of%20Agriculture%20and%20Forestry!5e0!3m2!1sen!2s!4v1718446733206!5m2!1sen!2s"
                                        width={650}
                                        height={550}
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactPage