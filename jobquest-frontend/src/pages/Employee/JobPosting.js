import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, {stepClasses} from '@mui/joy/Step';
import StepIndicator, {stepIndicatorClasses} from '@mui/joy/StepIndicator';
import Typography, {typographyClasses} from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import './CreateAc.css';
import Logo from "../../assets/jobQuestLogo.png";
import {Button, Dropdown, Flex, Input, InputNumber, message, Space} from "antd";
import {useNavigate} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {DownOutlined, UserOutlined} from '@ant-design/icons';

export default function JobPosting() {
    const nevigate = useNavigate();

    const navTopost = () => {
        nevigate('/jobPost');
    }

    const handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div>
            <div className='ediv1'>
                <div className='flex'>
                    <img src={Logo} alt="" className='mt-4 ml-3' style={{width: '17rem', height: 'auto'}}/>
                    <p className='text-2xl font-semibold text-red-500 mt-5 ml-1 pt-2'>For Employee</p>
                </div>
            </div>
            <div className='ediv2 flex h-screen' style={{height: '90vh'}}>
                <div className="w-full sm:w-1/2 lg:w-2/5" style={{borderRight: '1px solid black'}}>
                    <h1 className='mt-5 text-4xl font-bold text-center items-center'>Create your Employer Account</h1>
                    <Stepper orientation="vertical" sx={{
                        '--Stepper-verticalGap': '2.5rem',
                        '--StepIndicator-size': '2.5rem',
                        '--Step-gap': '1rem',
                        '--Step-connectorInset': '0.5rem',
                        '--Step-connectorRadius': '1rem',
                        '--Step-connectorThickness': '4px',
                        [`& .${stepClasses.completed}`]: {
                            '&::after': {bgcolor: '#afafaf'}, // Directly apply the color red
                        },
                        [`& .${stepClasses.active}`]: {
                            [`& .${stepIndicatorClasses.root}`]: {
                                border: '4px solid',
                                borderColor: '#fff',
                                boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                            },
                        },
                        [`& .${stepClasses.disabled} *`]: {
                            color: 'neutral.softDisabledColor',
                        },
                        [`& .${typographyClasses['title-sm']}`]: {
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontSize: '10px',
                        },
                    }} className='mt-5 justify-center items-center'>
                        <Step
                            completed
                            indicator={
                                <StepIndicator variant="solid" color="success">
                                    <CheckRoundedIcon/>
                                </StepIndicator>
                            }
                        >
                            <div>
                                <Typography level="title-sm">Step 1</Typography>
                                Create Account
                            </div>
                        </Step>
                        <Step
                            completed
                            indicator={
                                <StepIndicator variant="solid" color="success">
                                    <CheckRoundedIcon/>
                                </StepIndicator>
                            }
                        >
                            <div>
                                <Typography level="title-sm">Step 2</Typography>
                                Account Details
                            </div>
                        </Step>
                        <Step
                            completed
                            indicator={
                                <StepIndicator variant="solid" color="success">
                                    <CheckRoundedIcon/>
                                </StepIndicator>
                            }
                        >
                            <div>
                                <Typography level="title-sm">Step 3</Typography>
                                Job Posting
                            </div>
                        </Step>
                    </Stepper>

                </div>
                <div className="sm:w-1/2 lg:w-3/5 bg-white justify-content-center mt-5">
                    <h1 className='mt-1 text-4xl font-bold text-center items-center'>Post your first job</h1>
                    <div className=' ml-52 mt-4 flex justify-center items-center' style={{width: '30rem'}}>
                        <Flex vertical gap={16} className='w-full'>
                            <div>
                                <label className='font-semibold'>Job title</label>
                                <Input size='large' placeholder="Title" allowClear/>
                            </div>
                            <div>
                                <label className='font-semibold'>Job description</label>
                                <TextArea
                                    placeholder="Description"
                                    autoSize={{minRows: 3, maxRows: 5}}
                                />
                            </div>

                            <div>
                                <label className='font-semibold'>Job type</label>
                                <Input size='large' placeholder="Type" allowClear/>
                            </div>
                            <div>
                                <label className='font-semibold'>Job address</label>
                                <Input size='large' placeholder="Address" allowClear/>
                            </div>

                            <h1 className='mt-3'>Pay information(optional)</h1>

                            <Flex horizontal gap={50} className='w-full'>
                                <div>
                                    <div>
                                        <label className='font-semibold'>Pay minimum</label>
                                    </div>
                                    <div>
                                        <InputNumber
                                            defaultValue={0}
                                            className='w-24'
                                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className='font-semibold'>Pay maximum</label>
                                    </div>
                                    <div>
                                        <InputNumber
                                            defaultValue={0}
                                            className='w-24'
                                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <label className='font-semibold'>Rate</label>
                                    </div>
                                    <div>
                                        <Dropdown menu={menuProps}>
                                            <Button>
                                                <Space>
                                                    Per hour
                                                    <DownOutlined />
                                                </Space>
                                            </Button>
                                        </Dropdown>
                                    </div>
                                </div>
                            </Flex>

                        </Flex>
                    </div>
                    <div className='w-96 ml-64 mt-3 flex justify-center items-center'>
                        <Flex
                            vertical
                            gap="small"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Button size='large' className='mt-3' type="primary" danger block onClick={navTopost}>
                                Continue
                            </Button>
                        </Flex>
                    </div>


                </div>
            </div>
        </div>
    );
}