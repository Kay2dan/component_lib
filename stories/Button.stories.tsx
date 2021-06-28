import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from "./Button";

export default {
  component: Button,
  title: "Component/Button",
  argTypes: {

  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  onClickHandler: () => console.log("default button"),
  type: "button"
};
