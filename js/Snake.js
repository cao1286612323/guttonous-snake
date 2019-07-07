//�����߶���

export class Snake {
    //����ʵ��
    static getInstance() {
        if (!Snake.instance) {
            Snake.instance = new Snake();
        }
        return Snake.instance;
    }

    constructor(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.count = 0;
        this.body = [{
            x: 3,
            y: 2,
            color: "red"
        },
        {
            x: 2,
            y: 2,
            color: "orange"
        },
        {
            x: 1,
            y: 2,
            color: "orange"
        }
        ];

        this.direction = direction || "right";
        this.elements = [];
        this.remove = () => {
            //��β����ʼɾ��
            let i = this.elements.length - 1;
            for (; i >= 0; i--) {
                let ele = this.elements[i];
                ele.parentNode.removeChild(ele);
                this.elements.splice(i, 1);
            }
        };
    }
    //Ϊ����ӳ�ʼ������
    init(map) {
        //��ʼ��֮ǰ��ɾ����,�����ƶ�
        this.remove();
        //�����ߵ�ÿ����λ,һ��ͷ,�������岿��
        for (let i = 0; i < this.body.length; i++) {
            let div = document.createElement("div");
            //�ߵ�ÿ������
            let obj = this.body[i];
            map.appendChild(div);
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            //��������
            this.elements.push(div);
        }
    }

    //���ƶ��ķ���
    move(map, food) {
        //���ߵĵ��������ַŵ��ڶ���,�ڶ������ַŵ���һ��
        let i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //�жϷ���,ʹͷ���ƶ�
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }
        //�ж����Ƿ�Ե�ʳ��
        //��ȡ��ͷ��������ʳ������Ƚ�
        let headX = this.body[0].x * this.width;
        let headY = this.body[0].y * this.height;
        let score = document.querySelector("#score");
        if (headX == food.x && headY == food.y) {
            //��ȡ�ߵ�β��
            let last = this.body[this.body.length - 1];
            //���Ƹ�β��
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color
            });
            this.count++;
            score.innerHTML = `�÷�: ${this.count}`;
            //ɾ��ʳ�ﲢ�ҳ�ʼ��ʳ��
            food.init(map);
        }
    }
}