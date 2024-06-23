import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';


interface LikeRadioButtonProps {
  value: boolean;
  onChange: (e: RadioChangeEvent) => void;
}

const LikeRadioButton: React.FC<LikeRadioButtonProps> = ({ value, onChange }) => {
  return (
    <Radio.Group className='display-none' onChange={onChange} value={value}>
      <Radio value={true}>
        {value ? <LikeFilled /> : <LikeOutlined />}
      </Radio>
    </Radio.Group>
  );
};

export default LikeRadioButton;