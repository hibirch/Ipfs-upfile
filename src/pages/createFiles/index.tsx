import Link from "next/link";
import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Topbar from "../../components/Topsbar";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CopyToClipboard from "react-copy-to-clipboard";
import MutatingDotsLoader from "../../components/MutatingDotsLoader";

import { Token } from "../../utils/trpc";
import { BsFiles } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Web3Storage } from "web3.storage";
import { ContentCopyOutlined } from "@mui/icons-material";

import type { CIDString } from "web3.storage";
type FormData = {
  files: FileList;
};

const CreateFiles = () => {
  const [CID, setCID] = React.useState<CIDString | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copiedCID, setCopiedCID] = React.useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  // eslint-disable-next-line
  const onSubmit = handleSubmit((data: any) => {
    console.log(data.files);
    const client = new Web3Storage({ token: Token });
    setLoading(true);
    const put = async (files: FileList) => {
      const cid = await client.put(files);
      setCID(cid);
      console.log("stored files with cid:", cid);
      setLoading(false);
    };
    put(data.files);
  });

  return (
    <Topbar>
      <Box className="page flex h-2/3 w-2/3 flex-col items-center justify-center  gap-4 rounded-xl border border-zinc-800 p-16 shadow-lg">
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-center justify-center gap-8"
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Box className="relative flex h-32 w-32 items-center justify-center rounded-xl border border-gray-400">
              <input
                type={"file"}
                {...register("files")}
                multiple
                className="absolute h-full w-full cursor-pointer opacity-0"
              />
              <BsFiles className="h-16 w-16 " color="#646464" />
            </Box>
          </Stack>
          <Button type="submit" variant="contained" color="secondary">
            uipload file
          </Button>
        </form>
        {loading && <MutatingDotsLoader />}
        {CID !== null && (
          <Box>
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
                <span className=" text-xs">
                  <strong className="font-bold">CID:</strong> {CID}
                </span>
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
        )}
      </Box>
    </Topbar>
  );
};

export default CreateFiles;
