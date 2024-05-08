import React from "react";
import ReactDOM from "react-dom/client";

import Plugin from "./Plugin.tsx";
import MyndersContainer from "./layout/MyndersContainer.tsx";
import firebaseConfig from "./firebase.ts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyndersContainer>
      <Plugin
        firebaseConfig={firebaseConfig}
        user={{
          _id: "Aa1234",
          email: "user@example.com",
          activated_plugins: [
            {
              plugin_id: "com.mynders.work_log",
              plugin_name: "Sticky Notes",
              plugin_icon: "",
            },
          ],
          storage_usage: 4500,
        }}
        folderId="dummy-folder-id"
        encryptData={(data) => data}
        encryptFile={(blob: Blob) => Promise.resolve(blob)}
        decryptData={(data) => data}
        decryptFile={(blob: Blob, fileName: string, fileTypeInMeta: string) =>
          Promise.resolve(new File([blob], fileName, { type: fileTypeInMeta }))
        }
        setLocalStorage={(key: string, data: string) => {
          localStorage.setItem(`dummy-plugin-id:dummy-folder-id:${key}`, data);
        }}
        getLocalStorage={(key: string) => {
          return localStorage.getItem(`dummy-plugin-id:dummy-folder-id:${key}`);
        }}
        isLosingFocus={false}
        isHome={false}
      />
    </MyndersContainer>
  </React.StrictMode>
);
