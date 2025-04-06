import React, { useEffect } from 'react';

const CommentComponent = (props) => {
    const { dataHref } = props;

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [dataHref]);

    return (
        <section className="section" id="section-comments">
            <div className="container">
                <div className="card">
                    <div className="title_module mb-3 heading-bar d-flex justify-content-between align-items-center p-0">
                        <h2 className="bf_flower heading-bar__title">
                            HỎI ĐÁP - BÌNH LUẬN
                        </h2>
                    </div>
                    <div id="fb-root"></div>
                    <div className="fb-comments" data-href={dataHref} data-numposts="5" width="100%" data-colorscheme="light"></div>
                </div>
            </div>
        </section>
    );
};

export default CommentComponent;
