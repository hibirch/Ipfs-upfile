import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stepper from "@mui/material/Stepper";
import Loader from "../../components/Loader";
import Topbar from "../../components/Topsbar";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import StepLabel from "@mui/material/StepLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import StepContent from "@mui/material/StepContent";
import CopyToClipboard from "react-copy-to-clipboard";

import { Token } from "../../utils/trpc";
import { Web3Storage } from "web3.storage";
import { ContentCopyOutlined } from "@mui/icons-material";

import type { CIDString } from "web3.storage";

const CreateDoc = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [postBody, setPostBody] = React.useState("");
  const [profileNickname, setProfileNickname] = React.useState("");
  const [profileDescription, setProfileDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [CID, setCID] = React.useState<CIDString | null>(null);
  const [copiedCID, setCopiedCID] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePostBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostBody(event.target.value);
  };

  const storageHandler = async () => {
    setIsLoading(true);
    const storage = new Web3Storage({ token: Token });
    const data = {
      post_body: postBody,
      profile_nickname: profileNickname,
      profile_description: profileDescription,
      data_created: new Date().getTime(),
    };
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const dataFile = [new File([blob], "post.json")];
    const cid = await storage.put(dataFile);
    console.log(cid);
    setCID(cid);
    setIsLoading(false);
  };

  if (CID !== null && !isLoading) {
    return (
      <Topbar>
        <Box p={5}>
          <Box>
            <Alert
              severity="success"
              sx={{
                fontSize: "22px",
                display: "flex",
                justifyContent: "center",
                border: "1px solid green",
                borderRadius: "20px",
              }}
            >
              <AlertTitle>
                <strong>Congratulations!</strong>
              </AlertTitle>
              <strong>CID: {CID}</strong>
              <CopyToClipboard
                text={CID as string}
                onCopy={() => setCopiedCID(true)}
              >
                <IconButton>
                  <ContentCopyOutlined />
                </IconButton>
              </CopyToClipboard>
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                className="mt-2 w-full justify-center"
              >
                <a
                  target="_blank"
                  href={"http://" + CID + ".ipfs.w3s.link"}
                  className="rounded-2xl bg-pink-600 px-3 py-1 text-xs text-white"
                  rel="noreferrer"
                >
                  查看
                </a>
                <Link
                  href={"/"}
                  className="rounded-2xl bg-green-500 px-3 py-1 text-xs text-white"
                  rel="noreferrer"
                >
                  首页
                </Link>
              </Stack>
            </Alert>
          </Box>
          <Snackbar
            open={copiedCID}
            autoHideDuration={6000}
            onClose={() => setCopiedCID(false)}
          >
            <Alert
              onClose={() => setCopiedCID(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              CID Copied!
            </Alert>
          </Snackbar>
        </Box>
      </Topbar>
    );
  }

  return (
    <Topbar>
      <Box className="page flex h-2/3 w-2/3 flex-col items-center justify-center gap-4 rounded-xl border border-zinc-800 p-16 shadow-lg">
        {!isLoading && (
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className="w-3/4"
          >
            <Step>
              <StepLabel>Post</StepLabel>
              <StepContent>
                <TextField
                  fullWidth
                  required
                  label="Input Text"
                  value={postBody}
                  onChange={handlePostBody}
                />
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={postBody === ""}
                  sx={{ mt: 1, mr: 1 }}
                  size="small"
                >
                  Continue
                </Button>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Profile Settings</StepLabel>
              <StepContent>
                <TextField
                  id="outlined-basic"
                  label="Nickname"
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={profileNickname}
                  onChange={(e) => setProfileNickname(e.target.value)}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Profile Description"
                  multiline
                  fullWidth
                  rows={2}
                  margin="normal"
                  value={profileDescription}
                  onChange={(e) => setProfileDescription(e.target.value)}
                />
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => storageHandler()}
                    disabled={profileNickname === ""}
                    sx={{ mt: 1, mr: 1 }}
                    size="small"
                  >
                    Create
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    size="small"
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        )}
        {isLoading && <Loader />}
      </Box>
    </Topbar>
  );
};

export default CreateDoc;
