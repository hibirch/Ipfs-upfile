import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Topbar from "../components/Topsbar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";
import { BsFiles } from "react-icons/bs";
import { HiOutlineDocument } from "react-icons/hi";

const Home = () => {
  const router = useRouter();
  return (
    <Topbar>
      <Box className="page container flex h-full w-2/3 flex-col gap-4">
        <Typography variant="h3">IPFS 星际文件系统</Typography>
        <Typography className="w-full break-words">
          <strong>加密哈希内容寻址、 文件系统级加密和签名支持</strong>，
          IPFS像是一个分布式存储网络（类似于SIA），任何存储在系统里的资源，包括文字、图片、声音、视频，以及网站代码，通过IPFS进行哈希运算后，都会生成唯一的地址。
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          className="h-2/3 w-full rounded-xl border border-zinc-800 p-16 shadow-lg"
        >
          <Box className="flex w-1/2 flex-col items-center justify-center gap-1">
            <HiOutlineDocument className="h-16 w-16" />
            <Button
              variant="text"
              color="inherit"
              size="large"
              onClick={() => router.push("/createDoc")}
            >
              上传文本
            </Button>
          </Box>
          <Box className="flex w-1/2 flex-col items-center justify-center gap-1">
            <BsFiles className="h-16 w-16" />
            <Button
              variant="text"
              color="inherit"
              size="large"
              onClick={() => router.push("/createFiles")}
            >
              上传文件
            </Button>
          </Box>
        </Stack>
      </Box>
    </Topbar>
  );
};

export default Home;
