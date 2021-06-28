import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form } from "./Form";

export default {
  component: Form,
  title: "Component/Form",
  argType: {}
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const DefaultForm = Template.bind({});

DefaultForm.args = {}