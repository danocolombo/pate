import React from 'react';
import Header from '../../components/header/header.component';
import { MainFooter } from '../../components/footers/main-footer';
import './faq.styles.scss';
const FAQ = () => {
    return (
        <>
            <Header />
            <div className='faq-box'>
                <div className='faq-flex-box__container'>
                    <div className='faq-flex-box__body'>
                        <div className='faq-title'>
                            Frequently Asked Questions
                        </div>
                        <dl className='faq-definition__list'>
                            <dt className='faq-definition__term'>
                                What is PATE
                            </dt>
                            <dd className='faq-definition__definition'>
                                It is just shorthand for Principle 8 (P8)
                            </dd>
                            <dt className='faq-definition__term'>
                                What is a P8?
                            </dt>
                            <dd className='faq-definition__definition'>
                                Principle 8 (P8) is defined by the Celebrate
                                Recovery Principles of recovery.
                                <br />
                                <div className='faq-quote'>
                                    "Yield myself to God to be used to bring
                                    this Good News to others, both by my example
                                    and my words."
                                </div>
                                Taking that principle, a P8 Event is a group of
                                Celebrate Recovey leaders coming together to
                                strengthen, encourage and learn form each other.
                            </dd>
                            <dt className='faq-definition__term'>
                                Is this an official Celebrate Recovery event?
                            </dt>
                            <dd className='faq-definition__definition'>
                                It is an un-official Celebrate Recovery event
                                hosted, supported and organized by offiical
                                Celebrate Reocvery State Representatives, but it
                                is not sanctioned, funded or sponsored by
                                Celebrate Recovery or Saddleback Church.
                            </dd>
                            <dt className='faq-definition__term'>
                                Who is the intended audience?
                            </dt>
                            <dd className='faq-definition__definition'>
                                The goal is to get existing Celebrate Recovery
                                ministry leaders and volunteers together to
                                connect, encourage and develop a healthy
                                community to better serve the recovery needs in
                                their area.
                            </dd>
                            <dt className='faq-definition__term'>
                                If I want to start Celebrate Recovery, can I
                                come to a P8 event?
                            </dt>
                            <dd className='faq-definition__definition'>
                                You are encouraged to contact your Celebrate
                                Recovery State Representative and they can help
                                you get information on starting a Celebrate
                                Recovery ministry.
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    );
};
export default FAQ;
