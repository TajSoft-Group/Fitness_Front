<script setup>
import { ref, onMounted, computed } from "vue";
import Cookies from "js-cookie";
import gets from "@/components/axios/get";

const visitors = ref([]);
const isLoading = ref(true);
const search = ref("");
const error = ref(null);

const loadEntries = async () => {
    const token = Cookies.get("token");
    isLoading.value = true;

    try {
        const res = await gets(
            "https://missfitnessbackend.tajsoft.tj/api/services",
            token
        );

        // показываем только тех, кто вошёл в зал
        visitors.value = res.data.data
            .filter(v => v.entry_date)
            .sort(
                (a, b) =>
                    new Date(b.entry_date) - new Date(a.entry_date)
            );
    } catch (e) {
        error.value = e;
    } finally {
        isLoading.value = false;
    }
};


/**
 * 🔍 search by name / surname
 */
const filteredVisitors = computed(() => {
    if (!search.value) return visitors.value;

    const q = search.value.toLowerCase();
    return visitors.value.filter(v =>
        `${v.user_name} ${v.user_surname}`.toLowerCase().includes(q)
    );
});


onMounted(loadEntries);
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between title-block align-items-center">
                    <div class="page-title">Сейчас в зале</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="d-flex justify-content-between align-items-center search-block mt-4"
                    :class="{ 'search-input': search.length > 0 }">
                    <img src="@/assets/images/icons/search.png" alt="search" />
                    <input v-model="search" type="text" id="searchInput" placeholder="Поиск по всем параметрам" />
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row mt-4">
            <!-- Loading -->
            <div v-if="isLoading" class="text-center py-5">
                <div class="spinner-border text-warning"></div>
            </div>

            <!-- Error -->
            <div v-else-if="error" class="alert alert-danger">
                Ошибка загрузки данных
            </div>

            <!-- Cards -->
            <div v-else class="row gx-0">
                <div v-for="item in filteredVisitors" :key="item.id" class="col-3 px-0 mb-3">
                    <div class="bg-gray card-block h-auto card-item">
                        <div class="fw-bold d-flex align-items-center gap-2">
                            <span class="online-dot"></span>
                            {{ item.user_name }} {{ item.user_surname }}
                        </div>

                        <div class="small text-gray fw-bolder mt-2 mb-1">
                            Абонемент:
                            <span class="text-white">{{ item.services_name }}</span>
                        </div>

                        <div class="mt-2 text-warning d-flex align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 640 640">
                                <path
                                    d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z" />
                            </svg>
                            {{ item.entry_date }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.bg-gray {
    background: #1f1f1f;
    border-radius: 12px;
    padding: 16px;
}

/* 🔴 blinking dot */
.online-dot {
    width: 10px;
    height: 10px;
    background-color: #28ff28;
    border-radius: 50%;
    animation: blink 1.2s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }

    100% {
        opacity: 1;
    }
}

.text-warning svg {
    fill: #D0FD3E;
}

.text-warning {
    color: #D0FD3E !important;
}

.card-item {
    margin-inline: 12px;
    /* аналог ms-2 me-2 */
}

/* ❌ первая карточка в строке — убираем слева */
.col-3:nth-child(4n + 1) .card-item {
    margin-inline-start: 0;
}

/* ❌ последняя карточка в строке — убираем справа */
.col-3:nth-child(4n) .card-item {
    margin-inline-end: 0;
}
</style>
