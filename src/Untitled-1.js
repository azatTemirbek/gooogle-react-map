var _lkp_task_status = {
    $: GoogleMap,
    valueKey: 'id',
    labelKey: 'dsc',
    name: 'lkp_task_status',
    required: true,
    className: 'xrequired',
    label: 'Görev Durumu',
    value: values.lkp_task_status || '',
    onChange: this.onComboChange('lkp_task_status')
};

var _lkp_task_status && _(FormGroup, _lkp_task_status.hidden ? {
style: {
display: 'none'
}
} : (errors.lkp_task_status && {
className: 'validation-error'
}), _(Label, {
className: 'inputLabel',
htmlFor: "lkp_task_status"
}, _lkp_task_status.label), viewMode ? iwb.getFieldRawValue(_lkp_task_status, this.state.options.lkp_task_status) : _(_lkp_task_status.$ || Input, _lkp_task_status), errors.lkp_task_status && _('small', null, errors.lkp_task_status)))));
