backend:
  name: github
  repo: xucjiang-hash/adkins-site
  branch: main
  auth_type: implicit


local_backend: false

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "home"
    label: "首页内容"
    files:
      - file: "src/content/home.md"
        label: "首页"
        name: "home"
        fields:
          - { label: "标题", name: "title", widget: "string" }
          - { label: "正文", name: "body", widget: "markdown" }
