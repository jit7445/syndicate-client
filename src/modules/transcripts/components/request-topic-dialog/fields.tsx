import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "../../../../components/tooltip/Tooltip";
import { HookTextField } from "../../../../components/form-fields/SLFieldTextField";
import { HookSelect } from "../../../../components/form-fields/SLFieldSelect";
import FormCancelSubmitBtns from "../../../../components/form-cancel-submit-btns/FormCancelSubmitBtns";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { validRegex } from "../../../../utils/isValidType";
import { commonInputStyles } from "../../../../common/input-styles";
import InfoOutlined from "../../../../icons/InfoOutlined/InfoOutlined";
import type { RequestTopicFormValues } from "./types";

const DOMAIN_OPTIONS = [
  { label: "Enterprise SaaS", value: "Enterprise SaaS" },
  { label: "Robotics", value: "Robotics" },
  { label: "Retail", value: "Retail" },
  { label: "Other", value: "Other" },
];

type FieldsProps = {
  handleClose: () => void;
  handleFormChange: () => void;
};

export default function Fields({ handleClose, handleFormChange }: FieldsProps) {
  const { registerState, watch } = useHookFormContext<RequestTopicFormValues>();

  useEffect(() => {
    const subscription = watch((_value, { type }) => {
      if (type === "change") {
        handleFormChange();
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Grid container spacing={2} mt="1px">
      <HookTextField
        {...registerState("topic")}
        rules={{ required: { value: true, message: "This field is required" } }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Topic",
          placeholder: "What insight are you looking for?",
          required: true,
        }}
        gridProps={{ xs: 12 }}
      />
      <HookSelect
        {...registerState("domain")}
        rules={{ required: { value: true, message: "This field is required" } }}
        label="Domain"
        items={DOMAIN_OPTIONS}
        gridProps={{ xs: 12 }}
        formControlProps={{ margin: "none" }}
        selectProps={{ size: "small" }}
      />
      <HookTextField
        {...registerState("email")}
        rules={{
          pattern: {
            value: validRegex("email"),
            message: "Please enter a correct email",
          },
        }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Email",
          placeholder: "So we can notify you when it's ready",
        }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("remark")}
        textFieldProps={{
          ...commonInputStyles,
          label: "Remark",
          placeholder: "Any additional notes",
          multiline: true,
          minRows: 2,
        }}
        gridProps={{ xs: 12 }}
      />

      <Grid item xs={12} sx={{ pt: "8px !important", pb: "0px !important" }}>
        <p className="flex items-center gap-1 text-sm font-medium text-text-primary">
          Recommend an expert
          <Tooltip title="Share a name or LinkedIn if there's someone specific you'd like us to approach to get the transcript">
            <IconButton size="small" sx={{ color: "inherit", p: 0.5 }}>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </p>
      </Grid>
      <HookTextField
        {...registerState("suggestedExpertName")}
        textFieldProps={{ ...commonInputStyles, label: "Name" }}
        gridProps={{ xs: 12, sx: { pt: "8px !important" } }}
      />
      <HookTextField
        {...registerState("suggestedExpertLinkedin")}
        textFieldProps={{ ...commonInputStyles, label: "LinkedIn" }}
        gridProps={{ xs: 12 }}
      />

      <FormCancelSubmitBtns handleClose={handleClose} submitLabel="Request" />
    </Grid>
  );
}
